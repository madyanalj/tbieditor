import { BaseNode } from './'

class RectNode extends BaseNode {
  protected readonly TAG = 'rect'

  constructor(
    width: number,
    height: number,
    x: number = 0,
    y: number = 0,
  ) {
    super({ width, height, x, y })
  }
}

export { RectNode }
