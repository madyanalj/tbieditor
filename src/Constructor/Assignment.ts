import {
  CircleNode,
  EllipseNode,
  LineNode,
  PathNode,
  PolygonNode,
  PolylineNode,
  RectNode,
  TextNode,
} from '../SVG'
import { StateVariable, Store } from '../Store'
import { Constructor } from './'
import { Expression } from './Expression'

class Assignment extends Constructor {
  constructor(
    public readonly identifier: string,
    public readonly expression: Expression,
  ) {
    super()
  }

  public evaluate(store: Store): StateVariable {
    const evaluationResult = this.expression.evaluate(store)
    if (this.identifier[0] === '$') {
      store.setVariable(this.identifier, evaluationResult)
    } else if (this.identifier === 'type') {
      store.replaceSelectedNode(this.makeNode(evaluationResult))
    } else {
      store.setSelectedNodeProperty(this.identifier, evaluationResult)
    }
    return undefined
  }

  private makeNode(type: string) {
    const nodeClasses: { [key: string]: any } = {
      circle: CircleNode,
      ellipse: EllipseNode,
      line: LineNode,
      path: PathNode,
      polygon: PolygonNode,
      polyline: PolylineNode,
      rect: RectNode,
      text: TextNode,
    }
    const nodeClass = nodeClasses[type]
    if (typeof nodeClass === 'undefined') {
      this.throwTypeError(type, 'an object type')
    }
    return new nodeClass()
  }
}

export { Assignment }
