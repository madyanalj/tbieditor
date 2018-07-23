import {
  Assignment, Block, ExportStatement, NodeAddition, NodeSelection,
} from '../Constructor'
import { Identifier, Literal } from '../Constructor/Expression'
import {
  AdditionOperation, SubtractionOperation,
} from '../Constructor/Expression/BinaryOperation'
import { parse } from './'

describe('Parser', () => {
  let block: Block

  it('should return a Block', () => {
    block = parse('3')
    expect(block).toBeInstanceOf(Block)
  })

  it('should support empty input', () => {
    block = parse('')
    expect(block.statements).toHaveLength(0)
  })

  it('should support number literal', () => {
    block = parse('3')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(Literal)
    expect((statement as Literal).value).toBe(3)
  })

  it('should support number literal with decimal', () => {
    block = parse('3.50')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(Literal)
    expect((statement as Literal).value).toBe(3.5)
  })

  it('should support number literal with decimal without left digit', () => {
    block = parse('.50')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(Literal)
    expect((statement as Literal).value).toBe(0.50)
  })

  it('should support string literal', () => {
    block = parse("'Hello World!'")
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(Literal)
    expect((statement as Literal).value).toBe('Hello World!')
  })

  it('should support string literal with escaping backslashes', () => {
    block = parse("'King\\'s'")
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(Literal)
    expect((statement as Literal).value).toBe("King's")
  })

  it('should support string literal with escaping multiple backslashes', () => {
    block = parse("'Let\\'s here \\' and two here \\'\\''")
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(Literal)
    expect((statement as Literal).value).toBe("Let's here ' and two here ''")
  })

  it('should support true boolean literal', () => {
    block = parse('true')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(Literal)
    expect((statement as Literal).value).toBe(true)
  })

  it('should support false boolean literal', () => {
    block = parse('false')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(Literal)
    expect((statement as Literal).value).toBe(false)
  })

  it('should support identifier', () => {
    block = parse('foo')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(Identifier)
    expect((statement as Identifier).name).toBe('foo')
  })

  it('should support identifier starting with $', () => {
    block = parse('$foo')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(Identifier)
    expect((statement as Identifier).name).toBe('$foo')
  })

  it('should support identifier starting with #', () => {
    block = parse('#foo')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(Identifier)
    expect((statement as Identifier).name).toBe('#foo')
  })

  it('should support identifier starting with _', () => {
    block = parse('_foo')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(Identifier)
    expect((statement as Identifier).name).toBe('_foo')
  })

  it('should support identifier containing _', () => {
    block = parse('foo_bar')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(Identifier)
    expect((statement as Identifier).name).toBe('foo_bar')
  })

  it('should support identifier containing -', () => {
    block = parse('foo-bar')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(Identifier)
    expect((statement as Identifier).name).toBe('foo-bar')
  })

  it('should support assignment', () => {
    block = parse('hello = 1')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(Assignment)
    const assignment = statement as Assignment
    expect(assignment.identifier).toBe('hello')
    expect((assignment.expression as Literal).value).toBe(1)
  })

  it('should support node addition', () => {
    block = parse('+ #foo')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(NodeAddition)
    expect((statement as NodeAddition).identifier).toBe('#foo')
  })

  it('should support node selection', () => {
    block = parse('> #foo')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(NodeSelection)
    expect((statement as NodeSelection).identifier).toBe('#foo')
  })

  it('should support export statement', () => {
    block = parse("-> 'hello.svg'")
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(ExportStatement)
    const exportStatement = statement as ExportStatement
    expect(exportStatement.filename).toEqual(new Literal('hello.svg'))
  })

  it('should support addition operation', () => {
    block = parse('10 + 5')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(AdditionOperation)
    const operation = statement as AdditionOperation
    expect(operation.left).toEqual(new Literal(10))
    expect(operation.right).toEqual(new Literal(5))
  })

  it('should support subtraction operation', () => {
    block = parse('10 - 5')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(SubtractionOperation)
    const operation = statement as SubtractionOperation
    expect(operation.left).toEqual(new Literal(10))
    expect(operation.right).toEqual(new Literal(5))
  })

  it('should support multiple statements', () => {
    block = parse('foo\nbar')
    let statement = block.statements[0]
    expect(statement).toBeInstanceOf(Identifier)
    expect((statement as Identifier).name).toBe('foo')
    statement = block.statements[1]
    expect(statement).toBeInstanceOf(Identifier)
    expect((statement as Identifier).name).toBe('bar')
  })

  it('should ignore newlines before and after block', () => {
    block = parse('\nfoo\nbar\n\n')
    let statement = block.statements[0]
    expect(statement).toBeInstanceOf(Identifier)
    expect((statement as Identifier).name).toBe('foo')
    statement = block.statements[1]
    expect(statement).toBeInstanceOf(Identifier)
    expect((statement as Identifier).name).toBe('bar')
  })

  it('should ignore multiple newlines between statements', () => {
    block = parse('foo\n\n\nbar')
    let statement = block.statements[0]
    expect(statement).toBeInstanceOf(Identifier)
    expect((statement as Identifier).name).toBe('foo')
    statement = block.statements[1]
    expect(statement).toBeInstanceOf(Identifier)
    expect((statement as Identifier).name).toBe('bar')
  })

  it('should ignore non-breaking space before and after block', () => {
    block = parse(' $a =  34  ')
    expect(block).toEqual(parse('$a = 34'))
  })

  it('should ignore non-breaking space inside statement', () => {
    block = parse('$a     =   34')
    expect(block).toEqual(parse('$a = 34'))
  })

  it('should support single-line comments', () => {
    block = parse('1// Hello\n2')
    expect(block).toEqual(parse('1\n2'))
  })

  it('should support multi-line comments', () => {
    block = parse('1/* Hello\n World!*/\n2')
    expect(block).toEqual(parse('1\n2'))
  })
})
