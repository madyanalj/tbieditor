import { NonEmptyNode, Properties } from './'

const defaultProperties = {
  'x': 0,
  'y': 0,
  'font-family': '',
  'font-size': 'medium',
  'font-weight': 'normal',
  'font-style': 'normal',
  'text-decoration': 'none',
  'text-anchor': 'start',
  'letter-spacing': 'normal',
  'word-spacing': 'normal',
}

/**
 * Data structure of text SVG node.
 */
class TextNode extends NonEmptyNode {
  /**
   * Properties of SVG node.
   */
  public readonly properties: Properties = {
    ...defaultProperties,
    'font-family': 'sans-serif',
  }

  /**
   * Default properties for the current node tag type.
   */
  protected readonly defaultProperties = defaultProperties

  /**
   * Tag of SVG node.
   */
  protected readonly TAG: string = 'text'

  /**
   * Gets the SVG source of the text content as a string.
   * @return Text content.
   */
  protected generateChildren(): string {
    return this.properties.content as string
  }
}

export { TextNode }
