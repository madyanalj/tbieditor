import { StateVariable, Store } from '../Store'
import { Block, Constructor } from './'
import { Expression, Literal } from './Expression'

class IfStatement extends Constructor {
  constructor(
    public readonly condition: Expression,
    public readonly body: Block,
    public readonly elseIfs: Array<{ condition: Expression, body: Block }> = [],
    public readonly elseBody?: Block,
  ) {
    super()
  }

  public evaluate(store: Store): StateVariable {
    for (const statement of this.statements) {
      if (statement.condition.evaluate(store)) {
        statement.body.evaluate(store)
        break
      }
    }
    return undefined
  }

  private get statements(): Array<{ condition: Expression, body: Block }> {
    const result = [
      { condition: this.condition, body: this.body },
      ...this.elseIfs,
    ]
    if (this.elseBody) {
      result.push({ condition: new Literal(true), body: this.elseBody })
    }
    return result
  }
}

export { IfStatement }
