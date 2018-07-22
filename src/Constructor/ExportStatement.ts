import { StateVariable, Store } from '../Store'
import { exporter } from '../Transpiler'
import { Constructor } from './'
import { Expression } from './Expression'

class ExportStatement extends Constructor {
  constructor(
    public readonly filename: Expression,
  ) {
    super()
  }

  public evaluate(store: Store): StateVariable {
    exporter.emitExport(this.filename.evaluate(store), store.rootNode)
    return undefined
  }
}

export { ExportStatement }
