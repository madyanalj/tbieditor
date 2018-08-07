import { RectNode, SVGNode } from './'

describe('SVGNode', () => {
  let node: SVGNode
  const attributes = [
    ['xmlns', 'http://www.w3.org/2000/svg'],
    ['xmlns:xlink', 'http://www.w3.org/1999/xlink'],
  ]

  beforeEach(() => {
    node = new SVGNode()
  })

  describe('#attributes', () => {
    it('should return array with correct length', () => {
      expect(node.attributes).toHaveLength(attributes.length + 1)
    })

    it.each(attributes)('should contain %s attribute', (name, value) => {
      expect(node.attributes).toContainEqual([name, value])
    })
  })

  describe('#generate', () => {
    let output: string

    function svg(children = ''): string {
      return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">${children}</svg>`
    }

    function rect(): string {
      return '<rect width="100" height="100" />'
    }

    beforeEach(() => {
      output = node.generate()
    })

    it('should start with correct opening tag', () => {
      expect(output.indexOf('<svg')).toBe(0)
    })

    it.each(attributes)('should contain %s attribute', (name) => {
      expect(output).toContain(` ${name}=`)
    })

    it.each(attributes)('should contain correct %s value', (name, value) => {
      expect(output).toContain(` ${name}="${value}"`)
    })

    it('should end with correct closing tag', () => {
      expect(output.lastIndexOf('</svg>')).toBe(output.length - 6)
    })

    it('should follow correct svg format', () => {
      expect(output).toBe(svg())
    })

    it('should support passing child node', () => {
      const child = new RectNode()
      node.children.push(child)
      output = node.generate()
      expect(output).toBe(svg(rect()))
    })

    it('should support passing multiple children nodes', () => {
      const child = new RectNode()
      for (let i = 0; i < 3; i++) {
        node.children.push(child)
      }
      output = node.generate()
      expect(output).toBe(svg(rect() + rect() + rect()))
    })
  })
})
