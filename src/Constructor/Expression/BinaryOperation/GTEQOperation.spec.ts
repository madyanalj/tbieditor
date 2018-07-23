import { Literal } from '../'
import { Store } from '../../../Store'
import { GTEQOperation } from './'

describe('GTEQOperation', () => {
  describe('#evaluate', () => {
    it('should return correct result of comparing two values', () => {
      const left = new Literal(1)
      const right = new Literal(2)
      const operation = new GTEQOperation(left, right)
      expect(operation.evaluate(new Store())).toBe(false)
    })
  })
})
