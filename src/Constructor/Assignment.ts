import { Constructor } from './'
import { Expression } from './Expression'
import { Store, StoreVariable } from './Store'

class Assignment extends Constructor {
  constructor(
    public readonly identifier: string,
    public readonly expression: Expression,
  ) {
    super()
  }

  public evaluate(store: Store): StoreVariable {
    store[this.identifier] = this.expression.evaluate(store)
    return undefined
  }
}

export { Assignment }
