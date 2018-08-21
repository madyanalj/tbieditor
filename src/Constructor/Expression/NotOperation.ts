import { StateVariable, Store } from '../../Store'
import { Expression } from './'

/**
 * Represents data structure of not operation AST node.
 */
class NotOperation extends Expression {
  /**
   * @param argument  Expression of argument.
   */
  constructor(
    public readonly argument: Expression,
  ) {
    super()
  }

  /**
   * Evaluates the AST node by evaluating the argument expression and returning
   * the reverse of the result.
   * @param  store Store instance.
   * @return       Evaluation result.
   */
  public evaluate(store: Store): StateVariable {
    return !this.argument.evaluate(store)
  }
}

export { NotOperation }
