import { PathNode } from './'

describe('PathNode', () => {
  it('should return instance', () => {
    const node = new PathNode()
    expect(node).toBeInstanceOf(PathNode)
  })
})
