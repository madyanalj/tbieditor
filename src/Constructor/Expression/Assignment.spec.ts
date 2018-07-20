import { Store } from '../Store'
import { Assignment, Literal } from './'

describe('Assignment', () => {
  describe('#evaluate', () => {
    let store: Store

    beforeEach(() => {
      store = { foo: 0 }
    })

    it('should support resetting value in store', () => {
      const assignment = new Assignment('foo', new Literal(111))
      assignment.evaluate(store)
      expect(store.foo).toBe(111)
    })

    it('should support setting new value in store', () => {
      const assignment = new Assignment('bar', new Literal(222))
      assignment.evaluate(store)
      expect(store.bar).toBe(222)
    })

    it('should return undefined', () => {
      const assignment = new Assignment('foo', new Literal(111))
      expect(assignment.evaluate(store)).toBeUndefined()
    })
  })
})
