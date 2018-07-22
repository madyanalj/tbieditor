import { Store } from '../Store'
import { Assignment, NodeAddition } from './'
import { Literal } from './Expression'

describe('NodeAddition', () => {
  describe('#evaluate', () => {
    let store: Store
    let nodeAddition: NodeAddition

    beforeEach(() => {
      store = new Store()
      nodeAddition = new NodeAddition('#box')
    })

    it('should return undefined', () => {
      expect(nodeAddition.evaluate(store)).toBeUndefined()
    })

    it('should add node in store', () => {
      nodeAddition.evaluate(store)
      expect(store.getVariable('#box')).toBeDefined()
    })

    it('should select added node', () => {
      nodeAddition.evaluate(store)
      const assignment = new Assignment('width', new Literal(400))
      assignment.evaluate(store)
      expect(store.rootNode.children[0].properties).toHaveProperty('width', 400)
    })
  })
})
