import { NonEmptyNode, Properties } from './'

const defaultProperties = {
  'viewBox': 'none',
  'xmlns': null,
  'xmlns:xlink': null,
}

/**
 * Data structure of root SVG node.
 */
class SVGNode extends NonEmptyNode {
  /**
   * Properties of SVG node.
   */
  public readonly properties: Properties = {
    ...defaultProperties,
    'xmlns': 'http://www.w3.org/2000/svg',
    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
  }

  /**
   * Default properties for the current node tag type.
   */
  protected readonly defaultProperties = defaultProperties

  /**
   * Tag of SVG node.
   */
  protected readonly TAG = 'svg'
}

export { SVGNode }
