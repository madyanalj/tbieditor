import { Expression } from '../'

/**
 * Represents data structure of binary operation AST node.
 */
abstract class BinaryOperation extends Expression {
  /**
   * @param left   First argument expression.
   * @param right  Second argument expression.
   */
  constructor(
    public readonly left: Expression,
    public readonly right: Expression,
  ) {
    super()
  }
}

export { BinaryOperation }
