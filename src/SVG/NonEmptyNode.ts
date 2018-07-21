import { BaseNode } from './'

abstract class NonEmptyNode extends BaseNode {
  public readonly children = []
}

export { NonEmptyNode }
