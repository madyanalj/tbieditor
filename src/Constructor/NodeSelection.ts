import { StateVariable, Store } from '../Store'
import { Constructor } from './'

class NodeSelection extends Constructor {
  constructor(
    public readonly identifier: string,
  ) {
    super()
  }

  public evaluate(store: Store): StateVariable {
    if (typeof store.getVariable(this.identifier) === 'undefined') {
      this.throwReferenceError(this.identifier)
    }
    store.selectNode(this.identifier)
    return undefined
  }
}

export { NodeSelection }
