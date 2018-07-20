import { BaseNode } from './'

abstract class NonEmptyNode extends BaseNode {
  constructor(
    attributes: { [key: string]: any },
    public readonly children: BaseNode[] = [],
  ) {
    super(attributes)
  }
}

export { NonEmptyNode }
