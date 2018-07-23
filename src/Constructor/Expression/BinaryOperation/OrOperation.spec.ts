import { Literal } from '../'
import { Store } from '../../../Store'
import { OrOperation } from './'

describe('OrOperation', () => {
  describe('#evaluate', () => {
    it('should return correct result of ORing two values', () => {
      const left = new Literal(false)
      const right = new Literal(true)
      const operation = new OrOperation(left, right)
      expect(operation.evaluate(new Store())).toBe(true)
    })
  })
})
