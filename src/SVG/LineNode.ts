import { BaseNode, Properties } from './'

const defaultProperties = {
  x1: 0,
  x2: 0,
  y1: 0,
  y2: 0,
}

/**
 * Data structure of line SVG node.
 */
class LineNode extends BaseNode {
  /**
   * Properties of SVG node.
   */
  public readonly properties: Properties = {
    ...defaultProperties,
    y1: 100,
    y2: 100,
    stroke: 'black',
  }

  /**
   * Default properties for the current node tag type.
   */
  protected readonly defaultProperties = defaultProperties

  /**
   * Tag of SVG node.
   */
  protected readonly TAG = 'line'
}

export { LineNode }
