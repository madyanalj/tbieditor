import { StateVariable, Store } from '../../Store'
import { Expression } from './'

/**
 * Represents data structure of identifier AST node.
 */
class Identifier extends Expression {
  /**
   * @param name  Identifier name.
   */
  constructor(
    public readonly name: string,
  ) {
    super()
  }

  /**
   * Evaluates the AST node by finding and returning identifier value stored
   * inside store.
   * @param  store Store instance.
   * @return       Evaluation result.
   */
  public evaluate(store: Store): StateVariable {
    const result = this.isNodePropertyIdentifier()
      ? store.getSelectedNodeProperty(this.name)
      : store.getVariable(this.name)
    if (typeof result === 'undefined') this.throwReferenceError(this.name)
    return result
  }

  /**
   * Detects whether the identifier name is a valid SVG node property name.
   * @return [description]
   */
  private isNodePropertyIdentifier() {
    return !['$', '#', '_'].includes(this.name[0])
  }
}

export { Identifier }
