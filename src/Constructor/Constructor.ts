import { Store, StoreVariable } from './Store'

abstract class Constructor {
  public abstract evaluate(store: Store): StoreVariable
}

export { Constructor }
