import { readFileSync } from 'fs'
import { Parser as JisonParser } from 'jison'
import { join } from 'path'
import { Block } from '../Constructor'

function readFile(name: string) {
  return readFileSync(join(__dirname, name), 'utf8')
}

const grammarHeader = readFile('grammarHeader.js')
const lexRules = readFile('lexRules.jisonlex')
const parseRules = readFile('parseRules.jison')
const grammar = `%{ ${grammarHeader} %} %lex ${lexRules} /lex ${parseRules}`

const jisonParser = new JisonParser(grammar)

class Parser {
  public readonly output: Block

  constructor(input: string) {
    this.output = jisonParser.parse(input.trim())
  }
}

export { Parser }
