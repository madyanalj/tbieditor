import { RectNode } from './'

describe('RectNode', () => {
  let node: RectNode
  const attributes = [['width', 200], ['x', 50], ['fill', 'blue']]

  beforeEach(() => {
    node = new RectNode()
    node.properties.width = 200
    node.properties.x = 50
    node.properties.fill = 'blue'
  })

  describe('#attributes', () => {
    it.each(attributes)('should contain %s attribute', (name, value) => {
      expect(node.attributes).toContainEqual([name, value])
    })

    it('should contain unfilterd attribute', () => {
      expect(node.attributes).toContainEqual(['height', 100])
    })

    it('should contain unfilterd defaulted attribute', () => {
      expect(node.attributes).toContainEqual(['y', 0])
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
      expect(output)
        .toBe('<rect x="50" width="200" height="100" fill="blue" />')
    })
  })
})
