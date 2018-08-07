import { NonEmptyNode, Properties } from './'

const defaultProperties = {
  'viewBox': 'none',
  'xmlns': null,
  'xmlns:xlink': null,
}

class SVGNode extends NonEmptyNode {
  public readonly properties: Properties = {
    ...defaultProperties,
    'xmlns': 'http://www.w3.org/2000/svg',
    'xmlns:xlink': 'http://www.w3.org/1999/xlink',
  }
  protected readonly defaultProperties = defaultProperties
  protected readonly TAG = 'svg'
}

export { SVGNode }
