import { parse } from '../Parser'
import { Store } from '../Store'
import { exporter } from './'

/**
 * Transpiles inputted script content into SVG and calls given callback
 * function on every exported image.
 * @param  input    Input script file content.
 * @param  callback Callback function to be called for every exported image.
 */
function transpile(
  input: string,
  callback: (filename: string, output: string) => void,
  inputFilename: string = '',
): void {
  exporter.onExport((filename, svgNode) => {
    callback(filename, svgNode.generate())
  })
  const block = parse(input, inputFilename)
  const store = new Store()
  store.setVariable('__FILENAME', inputFilename)
  block.evaluate(store)
  exporter.stop()
}

export { transpile }
