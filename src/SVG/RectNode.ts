import { BaseNode, Properties } from './'

const defaultProperties = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  rx: 0,
  ry: 0,
}

class RectNode extends BaseNode {
  public readonly properties: Properties = {
    ...defaultProperties,
    width: 100,
    height: 100,
  }
  protected readonly defaultProperties = defaultProperties
  protected readonly TAG = 'rect'
}

export { RectNode }
