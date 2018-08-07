import { RectNode } from '../SVG'
import { StateVariable, Store } from '../Store'
import { NodeSelection } from './'

class NodeAddition extends NodeSelection {
  public evaluate(store: Store): StateVariable {
    if (this.identifier[0] !== '#') {
      this.throwTypeError(this.identifier, 'a valid node identifier')
    }
    store.addNode(this.identifier, new RectNode())
    return super.evaluate(store)
  }
}

export { NodeAddition }
