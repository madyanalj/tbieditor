import { NonEmptyNode } from './'

class SVGNode extends NonEmptyNode {
  public readonly properties = {
    width: 500,
    height: 500,
  }
  protected readonly TAG = 'svg'

  public get attributes() {
    return {
      viewBox: `0 0 ${this.properties.width} ${this.properties.height}`,
      xmlns: 'http://www.w3.org/2000/svg',
    }
  }
}

export { SVGNode }
