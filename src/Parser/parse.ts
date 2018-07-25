import { readFileSync } from 'fs'
import { Parser } from 'jison'
import { join } from 'path'
import { Block, Constructor } from '../Constructor'

function readFile(name: string) {
  return readFileSync(join(__dirname, name), 'utf8')
}

const grammarHeader = readFile('grammarHeader.js')
const lexRules = readFile('lexRules.jisonlex')
const parseRules = readFile('parseRules.jison')
const grammar = `%{ ${grammarHeader} %} %lex ${lexRules} /lex ${parseRules}`

function makeParser(): Parser {
  const parser = new Parser(grammar)
  const { performAction } = parser
  parser.performAction = function() {
    const originalReturn = performAction.call(this, ...arguments)
    const { $: current, _$: information } = this
    if (current instanceof Constructor) {
      current.location = {
        start: information.range[0],
        end: information.range[1] - 1,
        line: information.first_line,
        column: information.first_column + 1,
      }
    }
    return originalReturn
  }
  return parser
}

function parse(input: string): Block {
  return makeParser().parse(input.trim())
}

export { parse }
