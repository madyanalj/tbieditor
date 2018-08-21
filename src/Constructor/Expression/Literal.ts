import { StateVariable } from '../../Store'
import { Expression } from './'

/**
 * Represents data structure of literal AST node.
 */
class Literal extends Expression {
  /**
   * @param value Literal value.
   */
  constructor(
    public readonly value: StateVariable,
  ) {
    super()
  }

  /**
   * Evaluates the AST node by returning literal value.
   * @return  Evaluation result.
   */
  public evaluate(): StateVariable {
    return this.value
  }
}

export { Literal }
