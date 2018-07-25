import { BaseNode, Properties } from './'

const defaultProperties = {
  points: '',
}

class PolylineNode extends BaseNode {
  public readonly properties: Properties = {
    ...defaultProperties,
    fill: 'none',
    stroke: 'black',
  }
  protected readonly defaultProperties = defaultProperties
  protected readonly TAG = 'polyline'
}

export { PolylineNode }
