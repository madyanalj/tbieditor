import { StateVariable, Store } from '../Store'
import { Constructor } from './'

/**
 * Represents data structure of a block AST node.
 */
class Block extends Constructor {
  /**
   * @param statements  Block children statements.
   */
  constructor(
    public readonly statements: Constructor[],
  ) {
    super()
  }

  /**
   * Evaluates the AST node by evaluating each children statement of the block.
   * @param  store Store instance.
   * @return       Evaluation result.
   */
  public evaluate(store: Store): StateVariable {
    this.statements.forEach((statement) => statement.evaluate(store))
    return undefined
  }
}

export { Block }
