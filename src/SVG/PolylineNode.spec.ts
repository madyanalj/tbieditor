import { PolylineNode } from './'

describe('PolylineNode', () => {
  it('should return instance', () => {
    const node = new PolylineNode()
    expect(node).toBeInstanceOf(PolylineNode)
  })
})
