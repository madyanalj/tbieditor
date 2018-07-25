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
    if (typeof result === 'undefined') {
      throw new ReferenceError(
        `${this.name} is not defined <${this.location!.filename}:${this.location!.line}:${this.location!.column}>`,
      )
    }
    return result
  }

  private isNodePropertyIdentifier() {
    return !['$', '#', '_'].includes(this.name[0])
  }
}

export { Identifier }
