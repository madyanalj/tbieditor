import { Literal } from '../'
import { Store } from '../../../Store'
import { MultiplicationOperation } from './'

describe('MultiplicationOperation', () => {
  describe('#evaluate', () => {
    it('should return sum of two values', () => {
      const left = new Literal(2)
      const right = new Literal(5)
      const operation = new MultiplicationOperation(left, right)
      expect(operation.evaluate(new Store())).toBe(10)
    })
  })
})
