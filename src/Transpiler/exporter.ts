import { EventEmitter } from 'events'
import { SVGNode } from '../SVG'

class Exporter extends EventEmitter {
  public static exporter = new Exporter()

  public onExport(
    listener: (filename: string, svgNode: SVGNode) => void,
  ): this {
    return super.on('export', listener)
  }

  public emitExport(filename: string, svgNode: SVGNode): boolean {
    return super.emit('export', filename, svgNode)
  }
}

const exporter = Exporter.exporter

export { exporter }
