import { StateVariable, Store } from '../Store'
import { Block, Constructor } from './'
import { Expression } from './Expression'

class ForLoop extends Constructor {
  constructor(
    public readonly identifier: string,
    public readonly expression: Expression,
    public readonly body: Block,
  ) {
    super()
  }

  public evaluate(store: Store): StateVariable {
    const object = this.expression.evaluate(store)
    object.forEach((item: any) => {
      store.setVariable(this.identifier, item)
      this.body.evaluate(store)
    })
    return undefined
  }
}

export { ForLoop }
