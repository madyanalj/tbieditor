import { processBoolean, processNumber, processString } from './helpers'

describe('helpers', () => {
  describe('#processNumber', () => {
    it('should return number', () => {
      expect(processNumber('123')).toBe(123)
    })

    it('should support number with decimal', () => {
      expect(processNumber('56.123')).toBe(56.123)
    })

    it('should support number without left digits', () => {
      expect(processNumber('.123')).toBe(.123)
    })
  })

  describe('#processString', () => {
    it('should return string', () => {
      expect(processString("'Hello World!'")).toBe('Hello World!')
    })

    it('should support string with escaping backslashes', () => {
      expect(processString("'King\\'s'")).toBe("King's")
    })

    it('should support string with escaping multiple backslashes', () => {
      const input = "'Let's add it here \\' and two here \\'\\''"
      const expected = "Let's add it here ' and two here ''"
      expect(processString(input)).toBe(expected)
    })
  })

  describe('#processBoolean', () => {
    it('should support true', () => {
      expect(processBoolean('true')).toBe(true)
    })

    it('should support false', () => {
      expect(processBoolean('false')).toBe(false)
    })
  })
})
