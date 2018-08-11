import { BaseNode } from '../../../SVG'
import { StateVariable, Store } from '../../../Store'
import { BinaryOperation } from './'

class MemberOperation extends BinaryOperation {
  public evaluate(store: Store): StateVariable {
    const parent = this.left.evaluate(store)
    const key = this.right.evaluate(store)
    return parent instanceof BaseNode
      ? parent.properties[key]
      : parent[key].evaluate(store)
  }
}

export { MemberOperation }
