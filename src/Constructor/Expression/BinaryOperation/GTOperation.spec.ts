import { Literal } from '../'
import { Store } from '../../../Store'
import { GTOperation } from './'

describe('GTOperation', () => {
  describe('#evaluate', () => {
    it('should return correct result of comparing two values', () => {
      const left = new Literal(1)
      const right = new Literal(2)
      const operation = new GTOperation(left, right)
      expect(operation.evaluate(new Store())).toBe(false)
    })
  })
})
