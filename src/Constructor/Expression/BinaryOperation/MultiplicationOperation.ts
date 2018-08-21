import { StateVariable, Store } from '../../../Store'
import { BinaryOperation } from './'

/**
 * Represents data structure of multiplication operation AST node.
 */
class MultiplicationOperation extends BinaryOperation {
  /**
   * Evaluates the AST node by evaluating the two argument expressions and
   * multiplying the results together.
   * @param  store Store instance.
   * @return       Evaluation result.
   */
  public evaluate(store: Store): StateVariable {
    return this.left.evaluate(store) * this.right.evaluate(store)
  }
}

export { MultiplicationOperation }
