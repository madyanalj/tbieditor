import { BaseNode, Properties } from './'

const defaultProperties = {
  cx: 0,
  cy: 0,
  rx: 0,
  ry: 0,
}

class EllipseNode extends BaseNode {
  public readonly properties: Properties = {
    ...defaultProperties,
    rx: 100,
    ry: 100,
  }
  protected readonly defaultProperties = defaultProperties
  protected readonly TAG = 'ellipse'
}

export { EllipseNode }
