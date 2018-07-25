import { TextNode } from './'

describe('TextNode', () => {
  describe('#generate', () => {
    it('should support text content', () => {
      const node = new TextNode()
      node.properties.content = 'Hello World!'
      expect(node.generate())
        .toBe('<text font-family="sans-serif">Hello World!</text>')
    })
  })
})
