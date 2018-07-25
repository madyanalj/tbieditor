import { LineNode } from './'

describe('LineNode', () => {
  it('should return instance', () => {
    const node = new LineNode()
    expect(node).toBeInstanceOf(LineNode)
  })
})
