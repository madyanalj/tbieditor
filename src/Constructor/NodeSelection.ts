import { StateVariable, Store } from '../Store'
import { Constructor } from './'

class NodeSelection extends Constructor {
  constructor(
    public readonly identifier: string,
  ) {
    super()
  }

  public evaluate(store: Store): StateVariable {
    store.selectNode(this.identifier)
    return undefined
  }
}

export { NodeSelection }
