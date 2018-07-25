import { StateVariable, Store } from '../Store'

abstract class Constructor {
  public location?: {
    filename: string,
    line: number,
    column: number,
  }
  public abstract evaluate(store: Store): StateVariable
}

export { Constructor }
