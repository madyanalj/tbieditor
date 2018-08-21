import { StateVariable, Store } from '../Store'
import { Block, Constructor } from './'
import { Expression, Literal } from './Expression'

/**
 * Represents data structure of if statement AST node.
 */
class IfStatement extends Constructor {
  /**
   * @param condition  If statement condition.
   * @param body       If statement body.
   * @param elseIfs    Else if statements.
   * @param elseBody   Else statement body.
   */
  constructor(
    public readonly condition: Expression,
    public readonly body: Block,
    public readonly elseIfs: Array<{ condition: Expression, body: Block }> = [],
    public readonly elseBody?: Block,
  ) {
    super()
  }

  /**
   * Evaluates the AST node by checking every statement condition in order and
   * evaluating the body of the first condition that evaluates to true.
   * @param  store Store instance.
   * @return       Evaluation result.
   */
  public evaluate(store: Store): StateVariable {
    for (const statement of this.statements) {
      if (statement.condition.evaluate(store)) {
        statement.body.evaluate(store)
        break
      }
    }
    return undefined
  }

  /**
   * Gets list of statements as a condition and body pairs.
   * @return Statement array of condition-body pairs.
   */
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
