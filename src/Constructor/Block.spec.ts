import { Assignment, Block } from './'
import { Literal } from './Expression'
import { Store } from './Store'

describe('Block', () => {
  describe('#evaluate', () => {
    let store: Store

    beforeEach(() => {
      store = new Store()
    })

    it('should return undefined', () => {
      const block = new Block([])
      expect(block.evaluate(store)).toBeUndefined()
    })

    it('should support empty blocks', () => {
      const storeCopy = Object.assign(new Store(), store)
      const block = new Block([])
      block.evaluate(store)
      expect(store).toEqual(storeCopy)
    })

    it('should evaluate statements', () => {
      const block = new Block([
        new Assignment('$foo', new Literal(111)),
        new Assignment('$bar', new Literal(222)),
      ])
      block.evaluate(store)
      expect(store.getVariable('$foo')).toBe(111)
      expect(store.getVariable('$bar')).toBe(222)
    })
  })
})
