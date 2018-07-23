import { readFileSync } from 'fs'
import { Parser } from 'jison'
import { join } from 'path'
import { Block } from '../Constructor'

function readFile(name: string) {
  return readFileSync(join(__dirname, name), 'utf8')
}

const grammarHeader = readFile('grammarHeader.js')
const lexRules = readFile('lexRules.jisonlex')
const parseRules = readFile('parseRules.jison')
const grammar = `%{ ${grammarHeader} %} %lex ${lexRules} /lex ${parseRules}`

function parse(input: string): Block {
  const parser = new Parser(grammar)
  return parser.parse(input.trim())
}

export { parse }
