import { BaseNode } from './'

class RectNode extends BaseNode {
  public readonly properties = {
    width: 100,
    height: 100,
    x: 0,
    y: 0,
  }
  protected readonly TAG = 'rect'
}

export { RectNode }
