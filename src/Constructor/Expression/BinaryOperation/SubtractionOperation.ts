import { StateVariable, Store } from '../../../Store'
import { BinaryOperation } from './'

class SubtractionOperation extends BinaryOperation {
  public evaluate(store: Store): StateVariable {
    return this.left.evaluate(store) - this.right.evaluate(store)
  }
}

export { SubtractionOperation }
