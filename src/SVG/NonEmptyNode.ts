import { BaseNode } from './'

/**
 * Data structure of SVG nodes that can have children.
 */
abstract class NonEmptyNode extends BaseNode {
  /**
   * Children of SVG node.
   */
  public readonly children: BaseNode[] = []

  /**
   * Produces the SVG source of the SVG node as a string.
   * @return SVG node source.
   */
  public generate(): string {
    const attributesOutput = this.generateAttributes()
    const childrenOutput = this.generateChildren()
    return `<${this.TAG + attributesOutput}>${childrenOutput}</${this.TAG}>`
  }

  /**
   * Produces the SVG source of the SVG node children as a string.
   * @return SVG node children source.
   */
  protected generateChildren(): string {
    return this.children
      .map((child) => child.generate())
      .join('')
  }
}

export { NonEmptyNode }
