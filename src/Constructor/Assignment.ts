import * as SVG from '../SVG'
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
    } else if (this.identifier === 'type') {
      store.replaceSelectedNode(this.makeNodeByType(evaluationResult))
    } else {
      store.setSelectedNodeProperty(this.identifier, evaluationResult)
    }
    return undefined
  }

  private makeNodeByType(type: string) {
    const nodeClass = type.charAt(0).toUpperCase() + type.slice(1) + 'Node'
    return new (SVG as any)[nodeClass]()
  }
}

export { Assignment }
