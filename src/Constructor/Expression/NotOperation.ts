import { StateVariable, Store } from '../../Store'
import { Expression } from './'

class NotOperation extends Expression {
  constructor(
    public readonly argument: Expression,
  ) {
    super()
  }

  public evaluate(store: Store): StateVariable {
    return !this.argument.evaluate(store)
  }
}

export { NotOperation }
