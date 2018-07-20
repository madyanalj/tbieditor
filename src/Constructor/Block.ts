import { Constructor } from './'
import { Store, StoreVariable } from './Store'

class Block extends Constructor {
  constructor(
    private readonly statements: Constructor[],
  ) {
    super()
  }

  public evaluate(store: Store): StoreVariable {
    this.statements.forEach((statement) => statement.evaluate(store))
    return undefined
  }
}

export { Block }
