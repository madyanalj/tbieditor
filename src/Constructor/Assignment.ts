import { readFileSync } from 'fs'
import { dirname, extname, join } from 'path'
import {
  CircleNode,
  EllipseNode,
  ImageNode,
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
    if (this.identifier[0] === '#' || this.identifier[0] === '_') {
      this.throwTypeError(this.identifier, 'assignable')
    }
    const evaluationResult = this.expression.evaluate(store)
    if (this.identifier[0] === '$') {
      store.setVariable(this.identifier, evaluationResult)
    } else if (this.identifier === 'type') {
      store.replaceSelectedNode(this.makeNode(evaluationResult))
    } else if (this.identifier === 'content') {
      store.replaceSelectedNode(new TextNode())
      store.setSelectedNodeProperty(this.identifier, evaluationResult)
    } else if (this.identifier === 'href') {
      store.replaceSelectedNode(new ImageNode())
      const filename = store.getVariable('__FILENAME')
      const path = dirname(typeof filename === 'undefined' ? '' : filename)
      const uri = this.getDataURI(evaluationResult, path)
      store.setSelectedNodeProperty('xlink:href', uri)
    } else {
      store.setSelectedNodeProperty(this.identifier, evaluationResult)
    }
    return undefined
  }

  private makeNode(type: string) {
    const nodeClasses: { [key: string]: any } = {
      circle: CircleNode,
      ellipse: EllipseNode,
      image: ImageNode,
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

  private getDataURI(filename: string, path: string): string {
    let extension = extname(filename).slice(1)
    if (extension === 'jpg') extension = 'jpeg'
    const data = readFileSync(join(path, filename), 'base64')
    return `data:image/${extension};base64,${data}`
  }
}

export { Assignment }
