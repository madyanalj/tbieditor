import { Block } from './'
import { Assignment, Literal } from './Expression'
import { Store } from './Store'

describe('Block', () => {
  describe('#evaluate', () => {
    let store: Store

    beforeEach(() => {
      store = {}
    })

    it('should return undefined', () => {
      const block = new Block([])
      expect(block.evaluate(store)).toBeUndefined()
    })

    it('should support empty blocks', () => {
      const block = new Block([])
      block.evaluate(store)
      expect(store).toEqual({})
    })

    it('should evaluate statements', () => {
      const block = new Block([
        new Assignment('foo', new Literal(111)),
        new Assignment('bar', new Literal(222)),
      ])
      block.evaluate(store)
      expect(store).toEqual({ foo: 111, bar: 222 })
    })
  })
})
