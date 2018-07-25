import { StateVariable, Store } from '../Store'

abstract class Constructor {
  public location?: {
    start: number,
    end: number,
    line: number,
    column: number,
  }
  public abstract evaluate(store: Store): StateVariable
}

export { Constructor }
