import { StateVariable, Store } from './Store'

abstract class Constructor {
  public abstract evaluate(store: Store): StateVariable
}

export { Constructor }
