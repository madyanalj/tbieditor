import { Assignment, Block } from '../'
import { StateVariable, Store } from '../../Store'
import { Expression, FunctionDeclaration, Identifier } from './'

class FunctionCall extends Expression {
  constructor(
    public readonly name: string,
    public readonly parameters: Expression[],
  ) {
    super()
  }

  public evaluate(store: Store): StateVariable {
    const decleration = new Identifier(this.name).evaluate(store)
    if (!(decleration instanceof FunctionDeclaration)) {
      this.throwTypeError(this.name, 'a function')
    }
    const assignments = this.parameters.map((parameter, index) => {
      return new Assignment(decleration.parameters[index], parameter)
    })
    new Block(assignments).evaluate(store)
    decleration.body.evaluate(store)
    return undefined
  }
}

export { FunctionCall }
