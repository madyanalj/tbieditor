import { StateVariable, Store } from '../../../Store'
import { BinaryOperation } from './'

/**
 * Represents data structure of lower than operation AST node.
 */
class LTOperation extends BinaryOperation {
  /**
   * Evaluates the AST node by evaluating the two argument expressions and
   * checking whether the first result is lower than the second one.
   * @param  store Store instance.
   * @return       Evaluation result.
   */
  public evaluate(store: Store): StateVariable {
    return this.left.evaluate(store) < this.right.evaluate(store)
  }
}

export { LTOperation }
