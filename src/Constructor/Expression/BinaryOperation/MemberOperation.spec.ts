import { Identifier, Literal } from '../'
import { Assignment, NodeAddition } from '../../'
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

    it('should return correct result of evaluation of SVG node property', () => {
      const store = new Store()
      new NodeAddition('#foo').evaluate(store)
      new Assignment('width', new Literal(30)).evaluate(store)
      const parent = new Identifier('#foo')
      const key = new Literal('width')
      const accessor = new MemberOperation(parent, key)
      expect(accessor.evaluate(store)).toBe(30)
    })
  })
})
