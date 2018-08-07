import { ImageNode } from './'

describe('ImageNode', () => {
  it('should return instance', () => {
    const node = new ImageNode()
    expect(node).toBeInstanceOf(ImageNode)
  })
})
