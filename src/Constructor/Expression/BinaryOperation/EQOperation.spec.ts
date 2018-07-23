import { Literal } from '../'
import { Store } from '../../../Store'
import { EQOperation } from './'

describe('EQOperation', () => {
  describe('#evaluate', () => {
    it('should return correct result of comparing two values', () => {
      const left = new Literal(5)
      const right = new Literal(5)
      const operation = new EQOperation(left, right)
      expect(operation.evaluate(new Store())).toBe(true)
    })
  })
})
