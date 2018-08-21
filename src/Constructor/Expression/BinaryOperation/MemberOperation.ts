import { BaseNode } from '../../../SVG'
import { StateVariable, Store } from '../../../Store'
import { BinaryOperation } from './'

/**
 * Represents data structure of member operation AST node.
 */
class MemberOperation extends BinaryOperation {
  /**
   * Evaluates the AST node by evaluating the two argument expressions and
   * returning the result of accessing the first argument member that has the
   * identifier name of the result of the second argument.
   * @param  store Store instance.
   * @return       Evaluation result.
   */
  public evaluate(store: Store): StateVariable {
    const parent = this.left.evaluate(store)
    const key = this.right.evaluate(store)
    return parent instanceof BaseNode
      ? parent.properties[key]
      : parent[key].evaluate(store)
  }
}

export { MemberOperation }
