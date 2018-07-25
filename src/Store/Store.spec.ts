import { RectNode, SVGNode, TextNode } from '../SVG'
import { Store } from './'

describe('Store', () => {
  let store: Store

  beforeEach(() => {
    store = new Store()
  })

  describe('#rootNode', () => {
    it('should return SVG node', () => {
      expect(store.rootNode).toBeInstanceOf(SVGNode)
    })
  })

  describe('#setVariable & #getVariable', () => {
    it('should get same value as value set', () => {
      store.setVariable('$foo', 111)
      expect(store.getVariable('$foo')).toBe(111)
    })
  })

  describe('#setNodeProperty & #getNodeProperty', () => {
    it('should get same value as value set', () => {
      store.setNodeProperty('#__ROOT', 'width', 250)
      expect(store.getNodeProperty('#__ROOT', 'width')).toBe(250)
    })
  })

  describe('#setSelectedNodeProperty & #getSelectedNodeProperty', () => {
    it('should get same value as value set', () => {
      store.setSelectedNodeProperty('width', 250)
      expect(store.getSelectedNodeProperty('width')).toBe(250)
    })
  })

  describe('#selectNode & #addNode', () => {
    let node: RectNode

    beforeEach(() => {
      node = new RectNode()
      store.addNode('#box', node)
    })

    it('should support adding node', () => {
      expect(store.rootNode.children[0]).toBe(node)
    })

    it('should support selecting node', () => {
      store.selectNode('#__ROOT')
      store.setSelectedNodeProperty('width', 250)
      store.selectNode('#box')
      store.setSelectedNodeProperty('width', 150)
      expect(store.getNodeProperty('#__ROOT', 'width')).toBe(250)
      expect(store.getNodeProperty('#box', 'width')).toBe(150)
    })
  })

  describe('#replaceNode', () => {
    let node: RectNode

    beforeEach(() => {
      node = new RectNode()
      store.addNode('#foo', node)
      store.setNodeProperty('#foo', 'content', 'Hello World!')
      store.replaceNode('#foo', new TextNode())
    })

    it('should replaced node type with correct value', () => {
      expect(store.getVariable('#foo')).toBeInstanceOf(TextNode)
    })

    it('should replaced node inside root children', () => {
      expect(store.rootNode.children[0]).toBe(store.getVariable('#foo'))
    })

    it('should keep defined properties', () => {
      expect(store.getNodeProperty('#foo', 'content')).toBe('Hello World!')
    })
  })

  describe('#replaceSelectedNode', () => {
    let node: RectNode

    beforeEach(() => {
      node = new RectNode()
      store.addNode('#foo', node)
      store.setNodeProperty('#foo', 'content', 'Hello World!')
      store.selectNode('#foo')
      store.replaceSelectedNode(new TextNode())
    })

    it('should replaced node type with correct value', () => {
      expect(store.getVariable('#foo')).toBeInstanceOf(TextNode)
    })

    it('should replaced node inside root children', () => {
      expect(store.rootNode.children[0]).toBe(store.getVariable('#foo'))
    })

    it('should keep defined properties', () => {
      expect(store.getNodeProperty('#foo', 'content')).toBe('Hello World!')
    })
  })
})
