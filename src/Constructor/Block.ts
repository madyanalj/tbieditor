import { StateVariable, Store } from '../Store'
import { Constructor } from './'

class Block extends Constructor {
  constructor(
    public readonly statements: Constructor[],
  ) {
    super()
  }

  public evaluate(store: Store): StateVariable {
    this.statements.forEach((statement) => statement.evaluate(store))
    return undefined
  }
}

export { Block }
