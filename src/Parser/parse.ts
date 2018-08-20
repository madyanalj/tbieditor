import { readFileSync } from 'fs'
import { Parser } from 'jison'
import { join } from 'path'
import { Block, Constructor } from '../Constructor'

/**
 * Reads content of a file inside the current file directory.
 * @param  name Filename.
 * @return      File content.
 */
function readFile(name: string) {
  return readFileSync(join(__dirname, name), 'utf8')
}

const grammarHeader = readFile('grammarHeader.js')
const lexRules = readFile('lexRules.jisonlex')
const parseRules = readFile('parseRules.jison')
const grammar = `%{ ${grammarHeader} %} %lex ${lexRules} /lex ${parseRules}`

/**
 * Creates an instance of the script file parser.
 * @param  filename Filename of script file.
 * @return          Parser instance.
 */
function makeParser(filename: string): Parser {
  const parser = new Parser(grammar)
  const { performAction } = parser
  parser.performAction = function() {
    const originalReturn = performAction.call(this, ...arguments)
    const { $: current, _$: information } = this
    if (current instanceof Constructor) {
      current.location = {
        filename,
        line: information.first_line,
        column: information.first_column + 1,
      }
    }
    return originalReturn
  }
  return parser
}

/**
 * Parses given script file content.
 * @param  input    Input script file content.
 * @param  filename Filename of script file.
 * @return          AST produced.
 */
function parse(input: string, filename: string = ''): Block {
  return makeParser(filename).parse(input)
}

export { parse }
