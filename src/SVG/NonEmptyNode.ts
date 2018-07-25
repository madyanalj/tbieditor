import { BaseNode } from './'

abstract class NonEmptyNode extends BaseNode {
  public readonly children: BaseNode[] = []

  public generate(): string {
    const attributesOutput = this.generateAttributes()
    const childrenOutput = this.generateChildren()
    return `<${this.TAG + attributesOutput}>${childrenOutput}</${this.TAG}>`
  }

  protected generateChildren(): string {
    return this.children
      .map((child) => child.generate())
      .join('')
  }
}

export { NonEmptyNode }
