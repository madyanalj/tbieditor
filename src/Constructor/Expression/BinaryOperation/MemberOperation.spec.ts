import { Literal } from '../'
import { Store } from '../../../Store'
import { MemberOperation } from './'

describe('MemberOperation', () => {
  describe('#evaluate', () => {
    it('should return correct result of evaluation of object member', () => {
      const parent = new Literal([new Literal(50), new Literal(100)])
      const key = new Literal(1)
      const accessor = new MemberOperation(parent, key)
      expect(accessor.evaluate(new Store())).toBe(100)
    })
  })
})
