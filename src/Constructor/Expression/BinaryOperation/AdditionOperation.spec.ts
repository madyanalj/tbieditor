import { Literal } from '../'
import { Store } from '../../../Store'
import { AdditionOperation } from './'

describe('AdditionOperation', () => {
  describe('#evaluate', () => {
    it('should return sum of two values', () => {
      const left = new Literal(1)
      const right = new Literal(2)
      const operation = new AdditionOperation(left, right)
      expect(operation.evaluate(new Store())).toBe(3)
    })
  })
})
