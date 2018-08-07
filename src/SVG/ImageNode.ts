import { BaseNode, Properties } from './'

const defaultProperties = {
  'x': 0,
  'y': 0,
  'width': 0,
  'height': 0,
  'xlink:href': '',
  'preserveAspectRatio': 'xMidYMid meet',
}

class ImageNode extends BaseNode {
  public readonly properties: Properties = {
    ...defaultProperties,
    width: 100,
    height: 100,
  }
  protected readonly defaultProperties = defaultProperties
  protected readonly TAG = 'image'
}

export { ImageNode }
