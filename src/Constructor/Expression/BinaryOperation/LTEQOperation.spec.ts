import { Literal } from '../'
import { Store } from '../../../Store'
import { LTEQOperation } from './'

describe('LTEQOperation', () => {
  describe('#evaluate', () => {
    it('should return correct result of comparing two values', () => {
      const left = new Literal(1)
      const right = new Literal(2)
      const operation = new LTEQOperation(left, right)
      expect(operation.evaluate(new Store())).toBe(true)
    })
  })
})
