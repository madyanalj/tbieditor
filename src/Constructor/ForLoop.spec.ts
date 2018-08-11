import { StateVariable, Store } from '../Store'
import { Assignment, Block, ForLoop } from './'
import { Identifier, Literal } from './Expression'
import { AdditionOperation } from './Expression/BinaryOperation'

describe('ForLoop', () => {
  describe('#evaluate', () => {
    let store: Store
    let loop: ForLoop
    let result: StateVariable

    beforeEach(() => {
      store = new Store()
      store.setVariable('$count', 0)
      loop = new ForLoop(
        '$i',
        new Literal([new Literal(1), new Literal(2)]),
        new Block([
          new Assignment(
            '$count',
            new AdditionOperation(new Identifier('$count'), new Literal(5)),
          ),
        ],
      ))
      result = loop.evaluate(store)
    })

    it('should return undefined', () => {
      expect(result).toBeUndefined()
    })

    it('should run correct number of iterations', () => {
      expect(store.getVariable('$count')).toBe(10)
    })

    it('should set correct identifier value at the end', () => {
      expect(store.getVariable('$i')).toBe(2)
    })
  })
})
