import { StateVariable } from '../../Store'
import { Expression } from './'

class Literal extends Expression {
  constructor(
    public readonly value: StateVariable,
  ) {
    super()
  }

  public evaluate(): StateVariable {
    return this.value
  }
}

export { Literal }
