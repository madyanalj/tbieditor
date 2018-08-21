import { StateVariable, Store } from '../../../Store'
import { BinaryOperation } from './'

/**
 * Represents data structure of subtraction operation AST node.
 */
class SubtractionOperation extends BinaryOperation {
  /**
   * Evaluates the AST node by evaluating the two argument expressions and
   * subtracting the second result from the first one.
   * @param  store Store instance.
   * @return       Evaluation result.
   */
  public evaluate(store: Store): StateVariable {
    return this.left.evaluate(store) - this.right.evaluate(store)
  }
}

export { SubtractionOperation }
