import { BaseNode, Properties } from './'

const defaultProperties = {
  points: '',
}

/**
 * Data structure of polygon SVG node.
 */
class PolygonNode extends BaseNode {
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
  protected readonly TAG: string = 'polygon'
}

export { PolygonNode }
