import { Store, StoreVariable } from '../Store'
import { Expression } from './'

class Identifier extends Expression {
  constructor(
    public readonly name: string,
  ) {
    super()
  }

  public evaluate(store: Store): StoreVariable {
    return store[this.name]
  }
}

export { Identifier }
