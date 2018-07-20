import { RectNode, SVGNode } from './'

describe('SVGNode', () => {
  const attributes = [['viewBox', '0 0 200 500'], ['xmlns', 'http://www.w3.org/2000/svg']]

  it.each(attributes)('should set %s attribute', (name) => {
    const node = new SVGNode(200, 500)
    expect(node.attributes).toHaveProperty(name)
  })

  it.each(attributes)('should set correct value for %s attribute', (name, value) => {
    const node = new SVGNode(200, 500)
    expect(node.attributes).toHaveProperty(name, value)
  })

  it('should support passing child nodes', () => {
    const children = [
      new RectNode(100, 200),
      new RectNode(200, 120),
      new RectNode(400, 600),
    ]
    const node = new SVGNode(200, 500, children)
    expect(node.children).toBe(children)
  })
})
