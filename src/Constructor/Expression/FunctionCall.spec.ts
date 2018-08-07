import { Assignment, Block } from '../'
import { Store } from '../../Store'
import { FunctionCall, FunctionDeclaration, Identifier, Literal } from './'

describe('Function', () => {
  describe('#evaluate', () => {
    let store: Store
    let call: FunctionCall

    beforeEach(() => {
      store = new Store()
      const decleration = new FunctionDeclaration(['$foo'], new Block([
        new Assignment('$bar', new Identifier('$foo')),
      ]))
      new Assignment('$baz', decleration).evaluate(store)
      call = new FunctionCall('$baz', [new Literal('Hello World!')])
    })

    it('should return undefined', () => {
      expect(call.evaluate(store)).toBeUndefined()
    })

    it('should evaluate function body', () => {
      call.evaluate(store)
      expect(new Identifier('$bar').evaluate(store)).toBe('Hello World!')
    })

    it('should support multiple function calls', () => {
      call.evaluate(store)
      call = new FunctionCall('$baz', [new Literal('Hello Again!')])
      call.evaluate(store)
      expect(new Identifier('$bar').evaluate(store)).toBe('Hello Again!')
    })

    it('should throw reference error when calling undeclared function', () => {
      call = new FunctionCall('$somethingElse', [new Literal('Hello Again!')])
      expect(() => call.evaluate(store)).toThrow(ReferenceError)
    })

    it('should throw type error when calling non-function variable', () => {
      call.evaluate(store)
      call = new FunctionCall('$bar', [new Literal('Hello Again!')])
      expect(() => call.evaluate(store)).toThrow(TypeError)
    })
  })
})
