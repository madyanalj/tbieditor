import { EventEmitter } from 'events'
import { SVGNode } from '../SVG'

/**
 * Event emitter that manages image export event.
 */
class Exporter extends EventEmitter {
  /**
   * Exporter object singleton.
   */
  public static exporter = new Exporter()

  /**
   * Registers a new listener to the export event.
   * @param  listener Listerner function to be called when event is emitted.
   * @return          Reference to the Exporter.
   */
  public onExport(
    listener: (filename: string, svgNode: SVGNode) => void,
  ): this {
    return super.on('export', listener)
  }

  /**
   * Emits export event.
   * @param  filename Filename of image to be exported.
   * @param  svgNode  Root SVG node of the image to be exported.
   * @return          True if the event had listeners, false otherwise.
   */
  public emitExport(filename: string, svgNode: SVGNode): boolean {
    return super.emit('export', filename, svgNode)
  }

  /**
   * Removes all listeners for the export event.
   * @return Reference to the Exporter.
   */
  public stop(): this {
    return super.removeAllListeners('export')
  }
}

const exporter = Exporter.exporter

export { exporter }
