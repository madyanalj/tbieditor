import { StateVariable, Store } from '../../../Store'
import { BinaryOperation } from './'

/**
 * Represents data structure of addition operation AST node.
 */
class AdditionOperation extends BinaryOperation {
  /**
   * Evaluates the AST node by evaluating the two argument expressions and
   * adding the results together.
   * @param  store Store instance.
   * @return       Evaluation result.
   */
  public evaluate(store: Store): StateVariable {
    return this.left.evaluate(store) + this.right.evaluate(store)
  }
}

export { AdditionOperation }
