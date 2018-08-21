import { Block } from '../'
import { StateVariable } from '../../Store'
import { Expression } from './'

/**
 * Represents data structure of function declaration AST node.
 */
class FunctionDeclaration extends Expression {
  /**
   * @param parameters  Parameters of function declared.
   * @param body        Body of function declared.
   */
  constructor(
    public readonly parameters: string[],
    public readonly body: Block,
  ) {
    super()
  }

  /**
   * Evaluates the AST node by returning instance of function.
   * @return       Evaluation result.
   */
  public evaluate(): StateVariable {
    return this
  }
}

export { FunctionDeclaration }
