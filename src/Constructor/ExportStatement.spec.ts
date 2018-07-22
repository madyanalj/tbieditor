import { Store } from '../Store'
import { exporter } from '../Transpiler'
import { ExportStatement } from './'
import { Literal } from './Expression'

describe('ExportStatement', () => {
  describe('#evaluate', () => {
    let store: Store
    let exportStatement: ExportStatement

    beforeEach(() => {
      store = new Store()
      exportStatement = new ExportStatement(new Literal('hello.svg'))
    })

    it('should return undefined', () => {
      expect(exportStatement.evaluate(store)).toBeUndefined()
    })

    it('should emit export event', () => {
      exporter.onExport((filename, svgNode) => {
        expect(filename).toBe('hello.svg')
        expect(svgNode).toBe(store.rootNode)
      })
      exportStatement.evaluate(store)
    })
  })
})
