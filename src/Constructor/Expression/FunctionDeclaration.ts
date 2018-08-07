import { Block } from '../'
import { StateVariable } from '../../Store'
import { Expression } from './'

class FunctionDeclaration extends Expression {
  constructor(
    public readonly parameters: string[],
    public readonly body: Block,
  ) {
    super()
  }

  public evaluate(): StateVariable {
    return this
  }
}

export { FunctionDeclaration }
