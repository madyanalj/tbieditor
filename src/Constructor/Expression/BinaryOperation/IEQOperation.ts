import { StateVariable, Store } from '../../../Store'
import { BinaryOperation } from './'

class IEQOperation extends BinaryOperation {
  public evaluate(store: Store): StateVariable {
    return this.left.evaluate(store) !== this.right.evaluate(store)
  }
}

export { IEQOperation }
