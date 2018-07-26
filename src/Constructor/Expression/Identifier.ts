import { StateVariable, Store } from '../../Store'
import { Expression } from './'

class Identifier extends Expression {
  constructor(
    public readonly name: string,
  ) {
    super()
  }

  public evaluate(store: Store): StateVariable {
    const result = this.isNodePropertyIdentifier()
      ? store.getSelectedNodeProperty(this.name)
      : store.getVariable(this.name)
    if (typeof result === 'undefined') this.throwReferenceError(this.name)
    return result
  }

  private isNodePropertyIdentifier() {
    return !['$', '#', '_'].includes(this.name[0])
  }
}

export { Identifier }
