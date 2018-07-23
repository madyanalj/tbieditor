import { transpile } from './'

describe('transpile', () => {
  it('should emit correct filename', () => {
    transpile("-> 'foo-bar.svg'", (filename) => {
      expect(filename).toBe('foo-bar.svg')
    })
  })

  it('should emit correct output', () => {
    transpile("width = 300\n-> 'foo-bar.svg'", (_, output) => {
      const expected = '<svg viewBox="0 0 300 500" xmlns="http://www.w3.org/2000/svg"></svg>'
      expect(output).toBe(expected)
    })
  })
})
