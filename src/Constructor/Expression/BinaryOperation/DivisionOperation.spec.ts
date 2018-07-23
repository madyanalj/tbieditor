import { Literal } from '../'
import { Store } from '../../../Store'
import { DivisionOperation } from './'

describe('DivisionOperation', () => {
  describe('#evaluate', () => {
    it('should return sum of two values', () => {
      const left = new Literal(10)
      const right = new Literal(2)
      const operation = new DivisionOperation(left, right)
      expect(operation.evaluate(new Store())).toBe(5)
    })
  })
})
