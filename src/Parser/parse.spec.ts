import {
  Assignment, Block, ExportStatement, NodeAddition, NodeSelection,
} from '../Constructor'
import { Identifier, Literal, NotOperation } from '../Constructor/Expression'
import {
  AdditionOperation,
  AndOperation,
  DivisionOperation,
  EQOperation,
  GTEQOperation,
  GTOperation,
  IEQOperation,
  LTEQOperation,
  LTOperation,
  MemberOperation,
  MultiplicationOperation,
  OrOperation,
  SubtractionOperation,
} from '../Constructor/Expression/BinaryOperation'
import { parse } from './'

describe('parse', () => {
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

  it('should support array literal', () => {
    block = parse('[5]')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(Literal)
    expect((statement as Literal).value).toEqual([new Literal(5)])
  })

  it('should support array literal with multiple elements', () => {
    block = parse('[1, 2, 3]')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(Literal)
    expect((statement as Literal).value)
      .toEqual([new Literal(1), new Literal(2), new Literal(3)])
  })

  it('should support array literal with trailing comma', () => {
    block = parse('[1, 2, 3,]')
    expect(block).toEqual(parse('[1, 2, 3]'))
  })

  it('should support empty array literal', () => {
    block = parse('[]')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(Literal)
    expect((statement as Literal).value).toEqual([])
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

  it('should support multiplication operation', () => {
    block = parse('10 * 5')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(MultiplicationOperation)
    const operation = statement as MultiplicationOperation
    expect(operation.left).toEqual(new Literal(10))
    expect(operation.right).toEqual(new Literal(5))
  })

  it('should support division operation', () => {
    block = parse('10 / 5')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(DivisionOperation)
    const operation = statement as DivisionOperation
    expect(operation.left).toEqual(new Literal(10))
    expect(operation.right).toEqual(new Literal(5))
  })

  it('should support equality operation', () => {
    block = parse('10 == 5')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(EQOperation)
    const operation = statement as EQOperation
    expect(operation.left).toEqual(new Literal(10))
    expect(operation.right).toEqual(new Literal(5))
  })

  it('should support inequality operation', () => {
    block = parse('10 != 5')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(IEQOperation)
    const operation = statement as IEQOperation
    expect(operation.left).toEqual(new Literal(10))
    expect(operation.right).toEqual(new Literal(5))
  })

  it('should support greater than operation', () => {
    block = parse('10 > 5')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(GTOperation)
    const operation = statement as GTOperation
    expect(operation.left).toEqual(new Literal(10))
    expect(operation.right).toEqual(new Literal(5))
  })

  it('should support greater than or equal operation', () => {
    block = parse('10 >= 5')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(GTEQOperation)
    const operation = statement as GTEQOperation
    expect(operation.left).toEqual(new Literal(10))
    expect(operation.right).toEqual(new Literal(5))
  })

  it('should support less than operation', () => {
    block = parse('10 < 5')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(LTOperation)
    const operation = statement as LTOperation
    expect(operation.left).toEqual(new Literal(10))
    expect(operation.right).toEqual(new Literal(5))
  })

  it('should support less than or equal operation', () => {
    block = parse('10 <= 5')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(LTEQOperation)
    const operation = statement as LTEQOperation
    expect(operation.left).toEqual(new Literal(10))
    expect(operation.right).toEqual(new Literal(5))
  })

  it('should support AND logical operation', () => {
    block = parse('true && false')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(AndOperation)
    const operation = statement as AndOperation
    expect(operation.left).toEqual(new Literal(true))
    expect(operation.right).toEqual(new Literal(false))
  })

  it('should support OR logical operation', () => {
    block = parse('true || false')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(OrOperation)
    const operation = statement as OrOperation
    expect(operation.left).toEqual(new Literal(true))
    expect(operation.right).toEqual(new Literal(false))
  })

  it('should support NOT logical operation', () => {
    block = parse('!false')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(NotOperation)
    const operation = statement as NotOperation
    expect(operation.argument).toEqual(new Literal(false))
  })

  it('should support member operation', () => {
    block = parse('[10, 3, 5][1]')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(MemberOperation)
    const operation = statement as MemberOperation
    expect(operation.left).toEqual(parse('[10, 3, 5]').statements[0])
    expect(operation.right).toEqual(parse('1').statements[0])
  })

  it('should support nested member operation', () => {
    block = parse('[[1, 5], [2, 6]][1][0]')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(MemberOperation)
    const operation = statement as MemberOperation
    expect(operation.left).toEqual(parse('[[1, 5], [2, 6]][1]').statements[0])
    expect(operation.right).toEqual(parse('0').statements[0])
  })

  it('should support left to right operation order', () => {
    block = parse('10 * 2 + 5')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(AdditionOperation)
    const operation = statement as AdditionOperation
    expect(operation.left).toEqual(
      new MultiplicationOperation(new Literal(10), new Literal(2)),
    )
    expect(operation.right).toEqual(new Literal(5))
  })

  it('should support higher precedence', () => {
    block = parse('10 + 2 * 5')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(AdditionOperation)
    const operation = statement as AdditionOperation
    expect(operation.left).toEqual(new Literal(10))
    expect(operation.right).toEqual(
      new MultiplicationOperation(new Literal(2), new Literal(5)),
    )
  })

  it('should support parenthesis', () => {
    block = parse('(5)')
    expect(block).toEqual(parse('5'))
  })

  it('should support higher precedence with parenthesis on the left', () => {
    block = parse('(10 + 2) * 5')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(MultiplicationOperation)
    const operation = statement as MultiplicationOperation
    expect(operation.left).toEqual(
      new AdditionOperation(new Literal(10), new Literal(2)),
    )
    expect(operation.right).toEqual(new Literal(5))
  })

  it('should support higher precedence with parenthesis on the right', () => {
    block = parse('10 * (2 + 5)')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(MultiplicationOperation)
    const operation = statement as MultiplicationOperation
    expect(operation.left).toEqual(new Literal(10))
    expect(operation.right).toEqual(
      new AdditionOperation(new Literal(2), new Literal(5)),
    )
  })

  it('should ignore parenthesis that do not make difference', () => {
    block = parse('10 + (2 * 5)')
    expect(block).toEqual(parse('10 + 2 * 5'))
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
