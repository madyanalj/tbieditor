import { Store, StoreVariable } from '../Store'
import { Expression } from './'

class Assignment extends Expression {
  constructor(
    private readonly identifier: string,
    private readonly expression: Expression,
  ) {
    super()
  }

  public evaluate(store: Store): StoreVariable {
    store[this.identifier] = this.expression.evaluate(store)
    return undefined
  }
}

export { Assignment }
