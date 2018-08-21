import { StateVariable, Store } from '../Store'
import { exporter } from '../Transpiler'
import { Constructor } from './'
import { Expression } from './Expression'

/**
 * Represents data structure of export statement AST node.
 */
class ExportStatement extends Constructor {
  /**
   * @param filename  Filename of image to be exported.
   */
  constructor(
    public readonly filename: Expression,
  ) {
    super()
  }

  /**
   * Evaluates the AST node by emitting an export event to the Transpiler.
   * @param  store Store instance.
   * @return       Evaluation result.
   */
  public evaluate(store: Store): StateVariable {
    exporter.emitExport(this.filename.evaluate(store), store.rootNode)
    return undefined
  }
}

export { ExportStatement }
