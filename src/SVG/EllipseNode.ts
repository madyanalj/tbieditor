import { BaseNode, Properties } from './'

const defaultProperties = {
  cx: 0,
  cy: 0,
  rx: 0,
  ry: 0,
}

/**
 * Data structure of ellipse SVG node.
 */
class EllipseNode extends BaseNode {
  /**
   * Properties of SVG node.
   */
  public readonly properties: Properties = {
    ...defaultProperties,
    rx: 100,
    ry: 100,
  }

  /**
   * Default properties for the current node tag type.
   */
  protected readonly defaultProperties = defaultProperties

  /**
   * Tag of SVG node.
   */
  protected readonly TAG = 'ellipse'
}

export { EllipseNode }
