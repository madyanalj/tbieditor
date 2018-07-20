import { RectNode } from './'

describe('RectNode', () => {
  const attributes = [['width', 200], ['height', 500]]

  it.each(attributes)('should set %s attribute', (name) => {
    const node = new RectNode(200, 500)
    expect(node.attributes).toHaveProperty(name)
  })

  it.each(attributes)('should set correct value for %s attribute', (name, value) => {
    const node = new RectNode(200, 500)
    expect(node.attributes).toHaveProperty(name, value)
  })

  it.each([['x', 0], ['y', 0]])('should support defaulted %s attribute', (name, value) => {
    const node = new RectNode(200, 500)
    expect(node.attributes).toHaveProperty(name, value)
  })
})
