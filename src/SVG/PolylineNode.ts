import { BaseNode, Properties } from './'

const defaultProperties = {
  points: '',
}

/**
 * Data structure of polyline SVG node.
 */
class PolylineNode extends BaseNode {
  /**
   * Properties of SVG node.
   */
  public readonly properties: Properties = {
    ...defaultProperties,
    fill: 'none',
    stroke: 'black',
  }

  /**
   * Default properties for the current node tag type.
   */
  protected readonly defaultProperties = defaultProperties

  /**
   * Tag of SVG node.
   */
  protected readonly TAG: string = 'polyline'
}

export { PolylineNode }
