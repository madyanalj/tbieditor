import { Store } from '../Store'
import { Identifier } from './'

describe('Identifier', () => {
  describe('#evaluate', () => {
    let store: Store

    beforeEach(() => {
      store = new Store()
      store.setVariable('foo', 123)
    })

    it('should return value in store', () => {
      const identifier = new Identifier('foo')
      expect(identifier.evaluate(store)).toBe(123)
    })

    it('should support undefined identifier', () => {
      const identifier = new Identifier('bar')
      expect(identifier.evaluate(store)).toBeUndefined()
    })
  })
})
