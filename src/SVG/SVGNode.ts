import { BaseNode, NonEmptyNode } from './'

class SVGNode extends NonEmptyNode {
  protected readonly TAG = 'svg'

  constructor(
    width: number,
    height: number,
    children?: BaseNode[],
  ) {
    super({
      viewBox: `0 0 ${width} ${height}`,
      xmlns: 'http://www.w3.org/2000/svg',
    }, children)
  }
}

export { SVGNode }
