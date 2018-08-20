import { BaseNode, Properties } from './'

const defaultProperties = {
  'x': 0,
  'y': 0,
  'width': 0,
  'height': 0,
  'xlink:href': '',
  'preserveAspectRatio': 'xMidYMid meet',
}

/**
 * Data structure of image SVG node.
 */
class ImageNode extends BaseNode {
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
  protected readonly TAG = 'image'
}

export { ImageNode }
