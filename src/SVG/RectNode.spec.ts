import { RectNode } from './'

describe('RectNode', () => {
  it('should return instance', () => {
    const node = new RectNode()
    expect(node).toBeInstanceOf(RectNode)
  })
})
