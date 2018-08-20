import { BaseNode, Properties } from './'

const defaultProperties = {
  cx: 0,
  cy: 0,
  r: 0,
}

/**
 * Data structure of circle SVG node.
 */
class CircleNode extends BaseNode {
  /**
   * Properties of SVG node.
   */
  public readonly properties: Properties = {
    ...defaultProperties,
    r: 100,
  }

  /**
   * Default properties for the current node tag type.
   */
  protected readonly defaultProperties = defaultProperties

  /**
   * Tag of SVG node.
   */
  protected readonly TAG = 'circle'
}

export { CircleNode }
