import { BaseNode } from './'

abstract class NonEmptyNode extends BaseNode {
  public readonly children: BaseNode[] = []

  public generate(): string {
    const attributesOutput = this.generateAttributes()
    const childrenOutput = this.children
      .map((child) => child.generate())
      .join('')
    return `<${this.TAG + attributesOutput}>${childrenOutput}</${this.TAG}>`
  }
}

export { NonEmptyNode }
