import { StateVariable, Store } from '../Store'
import { Constructor } from './'

/**
 * Represents data structure of node selection AST node.
 */
class NodeSelection extends Constructor {
  /**
   * @param identifier  Identifier of SVG node to select.
   */
  constructor(
    public readonly identifier: string,
  ) {
    super()
  }

  /**
   * Evaluates the AST node by setting selected SVG node in store to the one
   * given.
   * @param  store Store instance.
   * @return       Evaluation result.
   */
  public evaluate(store: Store): StateVariable {
    if (typeof store.getVariable(this.identifier) === 'undefined') {
      this.throwReferenceError(this.identifier)
    }
    store.selectNode(this.identifier)
    return undefined
  }
}

export { NodeSelection }
