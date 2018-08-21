import { Assignment, Block } from '../'
import { StateVariable, Store } from '../../Store'
import { Expression, FunctionDeclaration, Identifier } from './'

/**
 * Represents data structure of function call AST node.
 */
class FunctionCall extends Expression {
  /**
   * @param name        Name of function to call.
   * @param parameters  Parameters to pass to function.
   */
  constructor(
    public readonly name: string,
    public readonly parameters: Expression[],
  ) {
    super()
  }

  /**
   * Evaluates the AST node by setting function parameters as store variables
   * and evaluating function body defined in store already.
   * @param  store Store instance.
   * @return       Evaluation result.
   */
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
