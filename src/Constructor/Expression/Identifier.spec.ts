import { Store } from '../../Store'
import { Identifier } from './'

describe('Identifier', () => {
  describe('#evaluate', () => {
    let store: Store

    beforeEach(() => {
      store = new Store()
      store.setVariable('$foo', 123)
      store.setSelectedNodeProperty('width', 250)
    })

    it('should return value in store', () => {
      const identifier = new Identifier('$foo')
      expect(identifier.evaluate(store)).toBe(123)
    })

    it('should support handling undefined identifier', () => {
      const identifier = new Identifier('$bar')
      identifier.location = { filename: 'foo-bar.tbi', line: 143, column: 342 }
      expect(() => identifier.evaluate(store)).toThrow(ReferenceError)
      expect(() => identifier.evaluate(store)).toThrow('at foo-bar.tbi:143:342')
    })

    it('should support node property identifier', () => {
      const identifier = new Identifier('width')
      expect(identifier.evaluate(store)).toBe(250)
    })
  })
})
