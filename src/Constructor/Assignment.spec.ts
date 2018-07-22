import { Assignment } from './'
import { Literal } from './Expression'
import { Store } from './Store'

describe('Assignment', () => {
  describe('#evaluate', () => {
    let store: Store

    beforeEach(() => {
      store = new Store()
    })

    it('should support setting new value in store', () => {
      const assignment = new Assignment('$foo', new Literal(111))
      assignment.evaluate(store)
      expect(store.getVariable('$foo')).toBe(111)
    })

    it('should support resetting value in store', () => {
      store.setVariable('$foo', 111)
      const assignment = new Assignment('$foo', new Literal(222))
      assignment.evaluate(store)
      expect(store.getVariable('$foo')).toBe(222)
    })

    it('should return undefined', () => {
      const assignment = new Assignment('$foo', new Literal(111))
      expect(assignment.evaluate(store)).toBeUndefined()
    })
  })
})
