import { Store } from '../Store'
import { Assignment, Block, IfStatement } from './'
import { Identifier, Literal } from './Expression'
import { EQOperation } from './Expression/BinaryOperation'

describe('IfStatement', () => {
  describe('#evaluate', () => {
    let store: Store
    let statement: IfStatement

    function idEquality(value: number) {
      return new EQOperation(new Identifier('$i'), new Literal(value))
    }

    function outputBlock(value: string) {
      return new Block([new Assignment('$output', new Literal(value))])
    }

    beforeEach(() => {
      store = new Store()
      store.setVariable('$i', 0)
      statement = new IfStatement(
        idEquality(1),
        outputBlock('If'),
        [
          { condition: idEquality(2), body: outputBlock('ElseIf1') },
          { condition: idEquality(3), body: outputBlock('ElseIf2') },
        ],
        outputBlock('Else'),
      )
    })

    it('should return undefined', () => {
      expect(statement.evaluate(store)).toBeUndefined()
    })

    it('should run if block when its condition is true', () => {
      store.setVariable('$i', 1)
      statement.evaluate(store)
      expect(store.getVariable('$output')).toBe('If')
    })

    it('should run else if block when its condition is true', () => {
      store.setVariable('$i', 2)
      statement.evaluate(store)
      expect(store.getVariable('$output')).toBe('ElseIf1')
    })

    it('should run else block when none of the conditions are true', () => {
      statement.evaluate(store)
      expect(store.getVariable('$output')).toBe('Else')
    })

    it('should support not having elseIfs', () => {
      statement = new IfStatement(
        new Literal(true),
        outputBlock('If'),
      )
      statement.evaluate(store)
      expect(store.getVariable('$output')).toBe('If')
    })

    it('should support not having else', () => {
      statement = new IfStatement(
        new Literal(true),
        outputBlock('If'),
        [],
      )
      statement.evaluate(store)
      expect(store.getVariable('$output')).toBe('If')
    })
  })
})
