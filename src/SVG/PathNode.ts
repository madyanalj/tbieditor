import { BaseNode, Properties } from './'

const defaultProperties = {
  d: '',
}

/**
 * Data structure of path SVG node.
 */
class PathNode extends BaseNode {
  /**
   * Properties of SVG node.
   */
  public readonly properties: Properties = {
    ...defaultProperties,
  }

  /**
   * Default properties for the current node tag type.
   */
  protected readonly defaultProperties = defaultProperties

  /**
   * Tag of SVG node.
   */
  protected readonly TAG: string = 'path'
}

export { PathNode }
