import { CircleNode } from './'

describe('CircleNode', () => {
  it('should return instance', () => {
    const node = new CircleNode()
    expect(node).toBeInstanceOf(CircleNode)
  })
})
