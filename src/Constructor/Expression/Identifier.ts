import { Store, StoreVariable } from '../Store'
import { Expression } from './'

class Identifier extends Expression {
  constructor(
    private readonly identifier: string,
  ) {
    super()
  }

  public evaluate(store: Store): StoreVariable {
    return store[this.identifier]
  }
}

export { Identifier }
