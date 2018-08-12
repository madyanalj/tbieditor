import { TextNode } from './'

describe('TextNode', () => {
  describe('#generate', () => {
    it('should support text content', () => {
      const node = new TextNode()
      node.properties.content = 'Hello World!'
      const expected = '<text font-family="sans-serif">Hello World!</text>'
      expect(node.generate()).toBe(expected)
    })
  })
})
