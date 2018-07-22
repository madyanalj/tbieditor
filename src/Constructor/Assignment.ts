import { StateVariable, Store } from '../Store'
import { Constructor } from './'
import { Expression } from './Expression'

class Assignment extends Constructor {
  constructor(
    public readonly identifier: string,
    public readonly expression: Expression,
  ) {
    super()
  }

  public evaluate(store: Store): StateVariable {
    const evaluationResult = this.expression.evaluate(store)
    if (this.identifier[0] === '$') {
      store.setVariable(this.identifier, evaluationResult)
    } else {
      store.setSelectedNodeProperty(this.identifier, evaluationResult)
    }
    return undefined
  }
}

export { Assignment }
