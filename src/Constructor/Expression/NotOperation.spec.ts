import { Store } from '../../Store'
import { Literal, NotOperation } from './'

describe('NotOperation', () => {
  describe('#evaluate', () => {
    it('should return correct result of NOTing value', () => {
      const argument = new Literal(true)
      const operation = new NotOperation(argument)
      expect(operation.evaluate(new Store())).toBe(false)
    })
  })
})
