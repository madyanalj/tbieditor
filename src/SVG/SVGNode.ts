import { NonEmptyNode } from './'

class SVGNode extends NonEmptyNode {
  public readonly properties = {
    width: 500,
    height: 500,
  }
  protected readonly TAG = 'svg'

  public get attributes(): Array<[string, any]> {
    return [
      ['viewBox', this.viewBox],
      ['xmlns', 'http://www.w3.org/2000/svg'],
    ]
  }

  private get viewBox(): string {
    return `0 0 ${this.properties.width} ${this.properties.height}`
  }
}

export { SVGNode }
