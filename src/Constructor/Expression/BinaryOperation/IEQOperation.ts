import { StateVariable, Store } from '../../../Store'
import { BinaryOperation } from './'

/**
 * Represents data structure of not equal to operation AST node.
 */
class IEQOperation extends BinaryOperation {
  /**
   * Evaluates the AST node by evaluating the two argument expressions and
   * checking whether results are not equal to each other.
   * @param  store Store instance.
   * @return       Evaluation result.
   */
  public evaluate(store: Store): StateVariable {
    return this.left.evaluate(store) !== this.right.evaluate(store)
  }
}

export { IEQOperation }
