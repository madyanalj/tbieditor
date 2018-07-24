import { StateVariable, Store } from '../../../Store'
import { BinaryOperation } from './'

class MemberOperation extends BinaryOperation {
  public evaluate(store: Store): StateVariable {
    return this.left.evaluate(store)[this.right.evaluate(store)].evaluate(store)
  }
}

export { MemberOperation }
