import { RectNode } from '../SVG'
import { StateVariable, Store } from '../Store'
import { NodeSelection } from './'

/**
 * Represents data structure of node addition AST node.
 */
class NodeAddition extends NodeSelection {
  /**
   * Evaluates the AST node by adding new SVG node into store.
   * @param  store Store instance.
   * @return       Evaluation result.
   */
  public evaluate(store: Store): StateVariable {
    if (this.identifier[0] !== '#') {
      this.throwTypeError(this.identifier, 'a valid node identifier')
    }
    store.addNode(this.identifier, new RectNode())
    return super.evaluate(store)
  }
}

export { NodeAddition }
