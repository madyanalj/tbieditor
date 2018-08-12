import { parse } from '../Parser'
import { Store } from '../Store'
import { exporter } from './'

function transpile(
  input: string,
  callback: (filename: string, output: string) => void,
): void {
  exporter.onExport((filename, svgNode) => {
    callback(filename, svgNode.generate())
  })
  const block = parse(input)
  block.evaluate(new Store())
  exporter.stop()
}

export { transpile }
