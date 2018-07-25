import { PolygonNode } from './'

describe('PolygonNode', () => {
  it('should return instance', () => {
    const node = new PolygonNode()
    expect(node).toBeInstanceOf(PolygonNode)
  })
})
