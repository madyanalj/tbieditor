import { BaseNode, Properties } from './'

const defaultProperties = {
  points: '',
}

class PolygonNode extends BaseNode {
  public readonly properties: Properties = {
    ...defaultProperties,
  }
  protected readonly defaultProperties = defaultProperties
  protected readonly TAG: string = 'polygon'
}

export { PolygonNode }
