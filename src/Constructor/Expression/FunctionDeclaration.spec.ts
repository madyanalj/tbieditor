import { Block } from '../'
import { FunctionDeclaration } from './'

describe('Function', () => {
  describe('#evaluate', () => {
    it('should return function declaration', () => {
      const statement = new FunctionDeclaration(['foo', 'bar'], new Block([]))
      expect(statement.evaluate()).toBe(statement)
    })
  })
})
