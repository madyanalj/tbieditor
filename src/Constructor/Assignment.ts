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

/**
 * Represents data structure of an assignment AST node.
 */
class Assignment extends Constructor {
  /**
   * @param identifier  Left identifier.
   * @param expression  Right expression.
   */
  constructor(
    public readonly identifier: string,
    public readonly expression: Expression,
  ) {
    super()
  }

  /**
   * Evaluates the AST node by first detecting the type of the left identifier
   * then setting it in the store to the result of evaluating the right
   * expression.
   * @param  store Store instance.
   * @return       Evaluation result.
   */
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

  /**
   * Makes an SVG node of a specific type.
   * @param  type SVG node type.
   * @return      Created SVG node.
   */
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

  /**
   * Reads an image file and produces its base64 data URI.
   * @param  filename Image filename.
   * @param  path     Image file path.
   * @return          Image data URI.
   */
  private getDataURI(filename: string, path: string): string {
    let extension = extname(filename).slice(1)
    if (extension === 'jpg') extension = 'jpeg'
    const data = readFileSync(join(path, filename), 'base64')
    return `data:image/${extension};base64,${data}`
  }
}

export { Assignment }
