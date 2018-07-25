import {
  Assignment,
  Block,
  ExportStatement,
  ForLoop,
  IfStatement,
  NodeAddition,
  NodeSelection,
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

  it('should contain correct location information', () => {
    block = parse('a = 36', 'hello.tbi')
    const statement = block.statements[0]
    expect((statement as Assignment).expression.location)
      .toEqual({ filename: 'hello.tbi', line: 1, column: 5 })
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
    expect((statement as Literal).value).toMatchObject([new Literal(5)])
  })

  it('should support array literal with multiple elements', () => {
    block = parse('[1, 2, 3]')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(Literal)
    expect((statement as Literal).value)
      .toMatchObject([new Literal(1), new Literal(2), new Literal(3)])
  })

  it('should support array literal with trailing comma', () => {
    block = parse('[1, 2, 3,]')
    const statement = block.statements[0]
    const { location, ...expected } = parse('[1, 2, 3]').statements[0]
    expect(statement).toMatchObject(expected)
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

  it('should support for loop', () => {
    block = parse('for $i in [1, 5] { 55 }')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(ForLoop)
    const loop = statement as ForLoop
    expect(loop.identifier).toBe('$i')
    expect(loop.expression)
      .toMatchObject(new Literal([new Literal(1), new Literal(5)]))
    expect(loop.body).toMatchObject(new Block([new Literal(55)]))
  })

  it('should support for loop with newline', () => {
    block = parse('for $i in [1, 5] {\n55\n}')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(ForLoop)
    const loop = statement as ForLoop
    expect(loop.identifier).toBe('$i')
    expect(loop.expression)
      .toMatchObject(new Literal([new Literal(1), new Literal(5)]))
    expect(loop.body).toMatchObject(new Block([new Literal(55)]))
  })

  it('should support if statement', () => {
    block = parse('if true { 1 }')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(IfStatement)
    expect(statement).toMatchObject(new IfStatement(
      new Literal(true),
      new Block([new Literal(1)]),
    ))
  })

  it('should support if statement with newline', () => {
    block = parse('if true {\n1\n}')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(IfStatement)
    expect(statement).toMatchObject(new IfStatement(
      new Literal(true),
      new Block([new Literal(1)]),
    ))
  })

  it('should support if statement with else if', () => {
    block = parse('if true { 1 } elif false { 2 }')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(IfStatement)
    expect(statement).toMatchObject(new IfStatement(
      new Literal(true),
      new Block([new Literal(1)]),
      [{ condition: new Literal(false), body: new Block([new Literal(2)])}],
    ))
  })

  it('should support if statement with multiple else ifs', () => {
    block = parse('if true { 1 } elif false { 2 } elif true { 3 }')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(IfStatement)
    expect(statement).toMatchObject(new IfStatement(
      new Literal(true),
      new Block([new Literal(1)]),
      [
        { condition: new Literal(false), body: new Block([new Literal(2)])},
        { condition: new Literal(true), body: new Block([new Literal(3)])},
      ],
    ))
  })

  it('should support if statement with else', () => {
    block = parse('if true { 1 } else { 2 }')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(IfStatement)
    expect(statement).toMatchObject(new IfStatement(
      new Literal(true),
      new Block([new Literal(1)]),
      [],
      new Block([new Literal(2)]),
    ))
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
    expect(statement)
      .toMatchObject(new ExportStatement(new Literal('hello.svg')))
  })

  it('should support addition operation', () => {
    block = parse('10 + 5')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(AdditionOperation)
    expect(statement)
      .toMatchObject(new AdditionOperation(new Literal(10), new Literal(5)))
  })

  it('should support subtraction operation', () => {
    block = parse('10 - 5')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(SubtractionOperation)
    expect(statement)
      .toMatchObject(new SubtractionOperation(new Literal(10), new Literal(5)))
  })

  it('should support multiplication operation', () => {
    block = parse('10 * 5')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(MultiplicationOperation)
    expect(statement).toMatchObject(new MultiplicationOperation(
      new Literal(10), new Literal(5),
    ))
  })

  it('should support division operation', () => {
    block = parse('10 / 5')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(DivisionOperation)
    expect(statement)
      .toMatchObject(new DivisionOperation(new Literal(10), new Literal(5)))
  })

  it('should support equality operation', () => {
    block = parse('10 == 5')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(EQOperation)
    expect(statement)
      .toMatchObject(new EQOperation(new Literal(10), new Literal(5)))
  })

  it('should support inequality operation', () => {
    block = parse('10 != 5')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(IEQOperation)
    expect(statement)
      .toMatchObject(new IEQOperation(new Literal(10), new Literal(5)))
  })

  it('should support greater than operation', () => {
    block = parse('10 > 5')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(GTOperation)
    expect(statement)
      .toMatchObject(new GTOperation(new Literal(10), new Literal(5)))
  })

  it('should support greater than or equal operation', () => {
    block = parse('10 >= 5')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(GTEQOperation)
    expect(statement)
      .toMatchObject(new GTEQOperation(new Literal(10), new Literal(5)))
  })

  it('should support less than operation', () => {
    block = parse('10 < 5')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(LTOperation)
    expect(statement)
      .toMatchObject(new LTOperation(new Literal(10), new Literal(5)))
  })

  it('should support less than or equal operation', () => {
    block = parse('10 <= 5')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(LTEQOperation)
    expect(statement)
      .toMatchObject(new LTEQOperation(new Literal(10), new Literal(5)))
  })

  it('should support AND logical operation', () => {
    block = parse('true && false')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(AndOperation)
    expect(statement)
      .toMatchObject(new AndOperation(new Literal(true), new Literal(false)))
  })

  it('should support OR logical operation', () => {
    block = parse('true || false')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(OrOperation)
    expect(statement)
      .toMatchObject(new OrOperation(new Literal(true), new Literal(false)))
  })

  it('should support NOT logical operation', () => {
    block = parse('!false')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(NotOperation)
    expect(statement).toMatchObject(new NotOperation(new Literal(false)))
  })

  it('should support member operation', () => {
    block = parse('[10, 3, 5][1]')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(MemberOperation)
    expect(statement).toMatchObject(new MemberOperation(
      new Literal([new Literal(10), new Literal(3), new Literal(5)]),
      new Literal(1),
    ))
  })

  it('should support nested member operation', () => {
    block = parse('$foo[1][0]')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(MemberOperation)
    expect(statement).toMatchObject(new MemberOperation(
      new MemberOperation(new Identifier('$foo'), new Literal(1)),
      new Literal(0),
    ))
  })

  it('should support left to right operation order', () => {
    block = parse('10 * 2 + 5')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(AdditionOperation)
    const operation = statement as AdditionOperation
    expect(operation.left).toMatchObject(
      new MultiplicationOperation(new Literal(10), new Literal(2)),
    )
    expect(operation.right).toMatchObject(new Literal(5))
  })

  it('should support higher precedence', () => {
    block = parse('10 + 2 * 5')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(AdditionOperation)
    const operation = statement as AdditionOperation
    expect(operation.left).toMatchObject(new Literal(10))
    expect(operation.right).toMatchObject(
      new MultiplicationOperation(new Literal(2), new Literal(5)),
    )
  })

  it('should support parenthesis', () => {
    block = parse('(5)')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(Literal)
    expect(statement).toMatchObject(new Literal(5))
  })

  it('should support higher precedence with parenthesis on the left', () => {
    block = parse('(10 + 2) * 5')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(MultiplicationOperation)
    expect(statement).toMatchObject(new MultiplicationOperation(
      new AdditionOperation(new Literal(10), new Literal(2)),
      new Literal(5),
    ))
  })

  it('should support higher precedence with parenthesis on the right', () => {
    block = parse('10 * (2 + 5)')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(MultiplicationOperation)
    expect(statement).toMatchObject(new MultiplicationOperation(
      new Literal(10),
      new AdditionOperation(new Literal(2), new Literal(5)),
    ))
  })

  it('should ignore parenthesis that do not make difference', () => {
    block = parse('10 + (2 * 5)')
    const statement = block.statements[0]
    expect(statement).toBeInstanceOf(AdditionOperation)
    expect(statement).toMatchObject(new AdditionOperation(
      new Literal(10),
      new MultiplicationOperation(new Literal(2), new Literal(5)),
    ))
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
    expect(block.statements[0])
      .toMatchObject(new Assignment('$a', new Literal(34)))
  })

  it('should ignore non-breaking space inside statement', () => {
    block = parse('$a     =   34')
    expect(block.statements[0])
      .toMatchObject(new Assignment('$a', new Literal(34)))
  })

  it('should support single-line comments', () => {
    block = parse('1// Hello\n2')
    expect(block.statements[0]).toMatchObject(new Literal(1))
    expect(block.statements[1]).toMatchObject(new Literal(2))
  })

  it('should support multi-line comments', () => {
    block = parse('1/* Hello\n World!*/\n2')
    expect(block.statements[0]).toMatchObject(new Literal(1))
    expect(block.statements[1]).toMatchObject(new Literal(2))
  })
})
