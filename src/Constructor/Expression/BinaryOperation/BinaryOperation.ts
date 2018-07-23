import { Expression } from '../'

abstract class BinaryOperation extends Expression {
  constructor(
    public readonly left: Expression,
    public readonly right: Expression,
  ) {
    super()
  }
}

export { BinaryOperation }
