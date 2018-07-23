import { Literal } from '../'
import { Store } from '../../../Store'
import { AndOperation } from './'

describe('AndOperation', () => {
  describe('#evaluate', () => {
    it('should return correct result of ANDing two values', () => {
      const left = new Literal(true)
      const right = new Literal(true)
      const operation = new AndOperation(left, right)
      expect(operation.evaluate(new Store())).toBe(true)
    })
  })
})
