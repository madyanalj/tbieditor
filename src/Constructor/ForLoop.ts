import { StateVariable, Store } from '../Store'
import { Block, Constructor } from './'
import { Expression } from './Expression'

/**
 * Represents data structure of ForLoop AST node.
 */
class ForLoop extends Constructor {
  /**
   * @param identifier  Identifier of iteration variable.
   * @param expression  Iteration expression.
   * @param body        Loop body block.
   */
  constructor(
    public readonly identifier: string,
    public readonly expression: Expression,
    public readonly body: Block,
  ) {
    super()
  }

  /**
   * Evaluates the AST node by evaluating the value of the iteration variable,
   * then evaluating the body if the iteration variable value was true.
   * @param  store Store instance.
   * @return       Evaluation result.
   */
  public evaluate(store: Store): StateVariable {
    const object = this.expression.evaluate(store)
    object.forEach((item: any) => {
      store.setVariable(this.identifier, item.evaluate(store))
      this.body.evaluate(store)
    })
    return undefined
  }
}

export { ForLoop }
