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
  'alignment-baseline': 'auto',
  'letter-spacing': 'normal',
  'word-spacing': 'normal',
}

class TextNode extends NonEmptyNode {
  public readonly properties: Properties = {
    ...defaultProperties,
    'font-family': 'sans-serif',
    'alignment-baseline': 'hanging',
  }
  protected readonly defaultProperties = defaultProperties
  protected readonly TAG: string = 'text'

  protected generateChildren(): string {
    return this.properties.content as string
  }
}

export { TextNode }
