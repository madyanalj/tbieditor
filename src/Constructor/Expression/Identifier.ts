import { StateVariable, Store } from '../Store'
import { Expression } from './'

class Identifier extends Expression {
  constructor(
    public readonly name: string,
  ) {
    super()
  }

  public evaluate(store: Store): StateVariable {
    return store.getVariable(this.name)
  }
}

export { Identifier }
