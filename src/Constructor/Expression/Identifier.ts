import { StateVariable, Store } from '../../Store'
import { Expression } from './'

class Identifier extends Expression {
  constructor(
    public readonly name: string,
  ) {
    super()
  }

  public evaluate(store: Store): StateVariable {
    if (this.isNodePropertyIdentifier()) {
      return store.getSelectedNodeProperty(this.name)
    }
    return store.getVariable(this.name)
  }

  private isNodePropertyIdentifier() {
    return !['$', '#', '_'].includes(this.name[0])
  }
}

export { Identifier }
