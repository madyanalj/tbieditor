import { BaseNode, Properties } from './'

const defaultProperties = {
  d: '',
}

class PathNode extends BaseNode {
  public readonly properties: Properties = {
    ...defaultProperties,
  }
  protected readonly defaultProperties = defaultProperties
  protected readonly TAG: string = 'path'
}

export { PathNode }
