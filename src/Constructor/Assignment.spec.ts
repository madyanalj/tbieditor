import { readFileSync } from 'fs'
import { ImageNode, RectNode, TextNode } from '../SVG'
import { Store } from '../Store'
import { Assignment } from './'
import { Literal } from './Expression'

jest.mock('fs')

describe('Assignment', () => {
  describe('#evaluate', () => {
    let store: Store

    beforeEach(() => {
      store = new Store()
    })

    it('should return undefined', () => {
      const assignment = new Assignment('$foo', new Literal(111))
      expect(assignment.evaluate(store)).toBeUndefined()
    })

    it('should support setting new value in store', () => {
      const assignment = new Assignment('$foo', new Literal(111))
      assignment.evaluate(store)
      expect(store.getVariable('$foo')).toBe(111)
    })

    it('should support resetting value in store', () => {
      store.setVariable('$foo', 111)
      const assignment = new Assignment('$foo', new Literal(222))
      assignment.evaluate(store)
      expect(store.getVariable('$foo')).toBe(222)
    })

    it('should support setting node property', () => {
      const assignment = new Assignment('width', new Literal(222))
      assignment.evaluate(store)
      expect(store.getSelectedNodeProperty('width')).toBe(222)
    })

    it('should support changing node type', () => {
      store.addNode('#foo', new RectNode())
      store.selectNode('#foo')
      const assignment = new Assignment('type', new Literal('text'))
      assignment.evaluate(store)
      expect(store.getVariable('#foo')).toBeInstanceOf(TextNode)
    })

    it('should through TypeError when invalid type is given', () => {
      store.addNode('#foo', new RectNode())
      store.selectNode('#foo')
      const assignment = new Assignment('type', new Literal('bar'))
      expect(() => assignment.evaluate(store)).toThrow(TypeError)
    })

    it('should support changing node type to text when content is set', () => {
      store.addNode('#foo', new RectNode())
      store.selectNode('#foo')
      const assignment = new Assignment('content', new Literal('Hello'))
      assignment.evaluate(store)
      expect(store.getVariable('#foo')).toBeInstanceOf(TextNode)
      expect(store.getVariable('#foo').properties)
        .toHaveProperty('content', 'Hello')
    })

    it('should support changing node type to image when href is set', () => {
      store.addNode('#foo', new RectNode())
      store.selectNode('#foo')
      const assignment = new Assignment('href', new Literal('bar.png'))
      assignment.evaluate(store)
      expect(store.getVariable('#foo')).toBeInstanceOf(ImageNode)
      expect(readFileSync).toHaveBeenCalledWith('bar.png', 'base64')
      const uri = store.getVariable('#foo').properties['xlink:href']
      expect(uri.indexOf('data:image/png;base64,')).toBe(0)
    })

    it('should support changing node type to jpeg image when href is set', () => {
      store.addNode('#foo', new RectNode())
      store.selectNode('#foo')
      const assignment = new Assignment('href', new Literal('bar.jpg'))
      assignment.evaluate(store)
      expect(store.getVariable('#foo')).toBeInstanceOf(ImageNode)
      expect(readFileSync).toHaveBeenCalledWith('bar.jpg', 'base64')
      const uri = store.getVariable('#foo').properties['xlink:href']
      expect(uri.indexOf('data:image/jpeg;base64,')).toBe(0)
    })

    it('should through TypeError when assigning node variable', () => {
      const assignment = new Assignment('#foo', new Literal('bar'))
      expect(() => assignment.evaluate(store)).toThrow(TypeError)
    })

    it('should through TypeError when assigning system variable', () => {
      const assignment = new Assignment('_FOO', new Literal('bar'))
      expect(() => assignment.evaluate(store)).toThrow(TypeError)
    })
  })
})
