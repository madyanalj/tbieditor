import { RectNode } from './'

describe('RectNode', () => {
  let node: RectNode
  const attributes = [['width', 200], ['height', 500], ['x', 50]]

  beforeEach(() => {
    node = new RectNode()
    node.properties.width = 200
    node.properties.height = 500
    node.properties.x = 50
  })

  describe('#attributes', () => {
    const allAttributes = [...attributes, ['y', 20]]

    beforeEach(() => {
      node.properties.y = 20
    })

    it('should return array with correct length', () => {
      expect(node.attributes).toHaveLength(allAttributes.length)
    })

    it.each(allAttributes)('should contain %s attribute', (name, value) => {
      expect(node.attributes).toContainEqual([name, value])
    })
  })

  describe('#generate', () => {
    let output: string

    beforeEach(() => {
      output = node.generate()
    })

    it('should start with correct opening tag', () => {
      expect(output.indexOf('<rect')).toBe(0)
    })

    it.each(attributes)('should contain %s attribute', (name) => {
      expect(output).toContain(` ${name}=`)
    })

    it.each(attributes)('should contain correct %s value', (name, value) => {
      expect(output).toContain(` ${name}="${value}"`)
    })

    it('should contain changed defaultable attribute', () => {
      node.properties.x = 5
      expect(output).not.toContain(' x=5')
    })

    it('should not contain defaulted attribute', () => {
      expect(output).not.toContain(' y=')
    })

    it('should self close openning tag', () => {
      expect(output.lastIndexOf(' />')).toBe(output.length - 3)
    })

    it('should follow correct svg format', () => {
      expect(output).toBe('<rect width="200" height="500" x="50" />')
    })
  })
})
