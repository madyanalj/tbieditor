import { Literal } from './'

describe('Literal', () => {
  describe('#evaluate', () => {
    it('should return value given in constructor', () => {
      const literal = new Literal(200)
      expect(literal.evaluate()).toBe(200)
    })
  })
})
