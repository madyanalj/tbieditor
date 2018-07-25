import { BaseNode, Properties } from './'

const defaultProperties = {
  x1: 0,
  x2: 0,
  y1: 0,
  y2: 0,
}

class LineNode extends BaseNode {
  public readonly properties: Properties = {
    ...defaultProperties,
    y1: 100,
    y2: 100,
    stroke: 'black',
  }
  protected readonly defaultProperties = defaultProperties
  protected readonly TAG = 'line'
}

export { LineNode }
