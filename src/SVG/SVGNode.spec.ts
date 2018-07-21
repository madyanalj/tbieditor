import { SVGNode } from './'

describe('SVGNode', () => {
  describe('#attributes', () => {
    const attributes = [['viewBox', '0 0 200 500'], ['xmlns', 'http://www.w3.org/2000/svg']]

    it.each(attributes)('should contain %s attribute', (name) => {
      const node = new SVGNode()
      expect(node.attributes).toHaveProperty(name)
    })

    it.each(attributes)('should contain correct %s value', (name, value) => {
      const node = new SVGNode()
      node.properties.width = 200
      node.properties.height = 500
      expect(node.attributes).toHaveProperty(name, value)
    })
  })
})
