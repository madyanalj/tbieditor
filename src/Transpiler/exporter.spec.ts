import { EventEmitter } from 'events'
import { SVGNode } from '../SVG'
import { exporter } from './'

describe('exporter', () => {
  it('should return an event emitter', () => {
    expect(exporter).toBeInstanceOf(EventEmitter)
  })

  it('should support emitting and listening to export event', () => {
    const filename = 'hello.svg'
    const svgNode = new SVGNode()
    exporter.onExport((emittedFilename, emittedSVGNode) => {
      expect(emittedFilename).toBe(filename)
      expect(emittedSVGNode).toBe(svgNode)
    })
    exporter.emitExport(filename, svgNode)
    exporter.stop()
  })
})
