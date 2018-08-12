import { parse } from '../Parser'
import { Store } from '../Store'
import { exporter } from './'

function transpile(
  input: string,
  callback: (filename: string, output: string) => void,
  inputFilename: string = '',
): void {
  exporter.onExport((filename, svgNode) => {
    callback(filename, svgNode.generate())
  })
  const block = parse(input)
  const store = new Store()
  store.setVariable('__FILENAME', inputFilename)
  block.evaluate(store)
  exporter.stop()
}

export { transpile }
