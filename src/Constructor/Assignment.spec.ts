import { RectNode, TextNode } from '../SVG'
import { Store } from '../Store'
import { Assignment } from './'
import { Literal } from './Expression'

describe('Assignment', () => {
  describe('#evaluate', () => {
    let store: Store

    beforeEach(() => {
      store = new Store()
    })

    it('should return undefined', () => {
      const assignment = new Assignment('$foo', new Literal(111))
      expect(assignment.evaluate(store)).toBeUndefined()
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

    it('should support setting node property', () => {
      const assignment = new Assignment('width', new Literal(222))
      assignment.evaluate(store)
      expect(store.getSelectedNodeProperty('width')).toBe(222)
    })

    it('should support changing node type', () => {
      store.addNode('#foo', new RectNode())
      store.selectNode('#foo')
      const assignment = new Assignment('type', new Literal('text'))
      assignment.evaluate(store)
      expect(store.getVariable('#foo')).toBeInstanceOf(TextNode)
    })
  })
})
