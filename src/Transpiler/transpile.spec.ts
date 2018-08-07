import { transpile } from './'

describe('transpile', () => {
  it('should emit correct filename', () => {
    transpile("-> 'foo-bar.svg'", (filename) => {
      expect(filename).toBe('foo-bar.svg')
    })
  })

  it('should emit correct output', () => {
    transpile("-> 'foo-bar.svg'", (_, output) => {
      const expected = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>'
      expect(output).toBe(expected)
    })
  })
})
