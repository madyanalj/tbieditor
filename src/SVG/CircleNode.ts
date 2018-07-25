import { BaseNode, Properties } from './'

const defaultProperties = {
  cx: 0,
  cy: 0,
  r: 0,
}

class CircleNode extends BaseNode {
  public readonly properties: Properties = {
    ...defaultProperties,
    r: 100,
  }
  protected readonly defaultProperties = defaultProperties
  protected readonly TAG = 'circle'
}

export { CircleNode }
