import { StoreVariable } from '../Store'
import { Expression } from './'

class Literal extends Expression {
  constructor(
    private readonly value: StoreVariable,
  ) {
    super()
  }

  public evaluate(): StoreVariable {
    return this.value
  }
}

export { Literal }
