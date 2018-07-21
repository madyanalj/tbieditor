import { Assignment, Block } from '../Constructor'
import { Identifier, Literal } from '../Constructor/Expression'
import { Parser } from './'

describe('Parser', () => {
  it('should return a Block', () => {
    const parser = new Parser('3')
    expect(parser.output).toBeInstanceOf(Block)
  })

  it('should support empty input', () => {
    const parser = new Parser('')
    expect(parser.output.statements).toHaveLength(0)
  })

  it('should support number literal', () => {
    const parser = new Parser('3')
    const statement = parser.output.statements[0]
    expect(statement).toBeInstanceOf(Literal)
    expect((statement as Literal).value).toBe(3)
  })

  it('should support number literal with decimal', () => {
    const parser = new Parser('3.50')
    const statement = parser.output.statements[0]
    expect(statement).toBeInstanceOf(Literal)
    expect((statement as Literal).value).toBe(3.5)
  })

  it('should support number literal with decimal without left digit', () => {
    const parser = new Parser('.50')
    const statement = parser.output.statements[0]
    expect(statement).toBeInstanceOf(Literal)
    expect((statement as Literal).value).toBe(0.50)
  })

  it('should support identifier', () => {
    const parser = new Parser('foo')
    const statement = parser.output.statements[0]
    expect(statement).toBeInstanceOf(Identifier)
    expect((statement as Identifier).name).toBe('foo')
  })

  it('should support identifier starting with $', () => {
    const parser = new Parser('$foo')
    const statement = parser.output.statements[0]
    expect(statement).toBeInstanceOf(Identifier)
    expect((statement as Identifier).name).toBe('$foo')
  })

  it('should support identifier starting with #', () => {
    const parser = new Parser('#foo')
    const statement = parser.output.statements[0]
    expect(statement).toBeInstanceOf(Identifier)
    expect((statement as Identifier).name).toBe('#foo')
  })

  it('should support identifier starting with _', () => {
    const parser = new Parser('_foo')
    const statement = parser.output.statements[0]
    expect(statement).toBeInstanceOf(Identifier)
    expect((statement as Identifier).name).toBe('_foo')
  })

  it('should support identifier containing _', () => {
    const parser = new Parser('foo_bar')
    const statement = parser.output.statements[0]
    expect(statement).toBeInstanceOf(Identifier)
    expect((statement as Identifier).name).toBe('foo_bar')
  })

  it('should support identifier containing -', () => {
    const parser = new Parser('foo-bar')
    const statement = parser.output.statements[0]
    expect(statement).toBeInstanceOf(Identifier)
    expect((statement as Identifier).name).toBe('foo-bar')
  })

  it('should support assignment', () => {
    const parser = new Parser('hello = 1')
    const statement = parser.output.statements[0]
    expect(statement).toBeInstanceOf(Assignment)
    const assignment = statement as Assignment
    expect(assignment.identifier).toBe('hello')
    expect((assignment.expression as Literal).value).toBe(1)
  })

  it('should support multiple statements', () => {
    const parser = new Parser('foo\nbar')
    let statement = parser.output.statements[0]
    expect(statement).toBeInstanceOf(Identifier)
    expect((statement as Identifier).name).toBe('foo')
    statement = parser.output.statements[1]
    expect(statement).toBeInstanceOf(Identifier)
    expect((statement as Identifier).name).toBe('bar')
  })

  it('should ignore newlines before and after block', () => {
    const parser = new Parser('\nfoo\nbar\n\n')
    let statement = parser.output.statements[0]
    expect(statement).toBeInstanceOf(Identifier)
    expect((statement as Identifier).name).toBe('foo')
    statement = parser.output.statements[1]
    expect(statement).toBeInstanceOf(Identifier)
    expect((statement as Identifier).name).toBe('bar')
  })

  it('should ignore multiple newlines between statements', () => {
    const parser = new Parser('foo\n\n\nbar')
    let statement = parser.output.statements[0]
    expect(statement).toBeInstanceOf(Identifier)
    expect((statement as Identifier).name).toBe('foo')
    statement = parser.output.statements[1]
    expect(statement).toBeInstanceOf(Identifier)
    expect((statement as Identifier).name).toBe('bar')
  })

  it('should ignore non-breaking space before and after block', () => {
    const parser = new Parser(' $a =  34  ')
    expect(parser.output).toEqual(new Parser('$a = 34').output)
  })

  it('should ignore non-breaking space inside statement', () => {
    const parser = new Parser('$a     =   34')
    expect(parser.output).toEqual(new Parser('$a = 34').output)
  })

  it('should support single-line comments', () => {
    const parser = new Parser('1// Hello\n2')
    expect(parser.output).toEqual(new Parser('1\n2').output)
  })

  it('should support multi-line comments', () => {
    const parser = new Parser('1/* Hello\n World!*/\n2')
    expect(parser.output).toEqual(new Parser('1\n2').output)
  })
})
