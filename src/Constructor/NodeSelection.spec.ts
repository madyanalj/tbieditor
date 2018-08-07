import { RectNode } from '../SVG'
import { Store } from '../Store'
import { NodeSelection } from './'

describe('NodeSelection', () => {
  describe('#evaluate', () => {
    let store: Store
    let box: RectNode
    let nodeSelection: NodeSelection

    beforeEach(() => {
      store = new Store()
      box = new RectNode()
      box.properties.width = 250
      store.addNode('#box', box)
      nodeSelection = new NodeSelection('#box')
    })

    it('should return undefined', () => {
      expect(nodeSelection.evaluate(store)).toBeUndefined()
    })

    it('should support setting new value in store', () => {
      nodeSelection.evaluate(store)
      expect(store.getSelectedNodeProperty('width')).toBe(250)
    })

    it('should through ReferenceError when selecting non-existing node', () => {
      nodeSelection = new NodeSelection('#foo')
      expect(() => nodeSelection.evaluate(store)).toThrow(ReferenceError)
    })
  })
})
