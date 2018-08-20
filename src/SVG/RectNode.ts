import { BaseNode, Properties } from './'

const defaultProperties = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  rx: 0,
  ry: 0,
}

/**
 * Data structure of rectangle SVG node.
 */
class RectNode extends BaseNode {
  /**
   * Properties of SVG node.
   */
  public readonly properties: Properties = {
    ...defaultProperties,
    width: 100,
    height: 100,
  }

  /**
   * Default properties for the current node tag type.
   */
  protected readonly defaultProperties = defaultProperties

  /**
   * Tag of SVG node.
   */
  protected readonly TAG = 'rect'
}

export { RectNode }
