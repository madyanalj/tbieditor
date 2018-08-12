import { readFileSync } from 'fs'
import { transpile } from './Transpiler'

const examples = [
  ['1-house.tbi', ['1-house.svg']],
  ['2-kcl.tbi', ['2-kcl.svg']],
  ['3-web-browser.tbi', [
    '3-web-browser-1.svg',
    '3-web-browser-2.svg',
    '3-web-browser-3.svg',
  ]],
]

const scripts: { [key: string]: string } = {}
examples.forEach(([name, outputFilenames]) => {
  scripts[name as string] = readFileSync(`examples/${name}`, 'utf8')
  const outNames = outputFilenames as string[]
  outNames.forEach((outName) => {
    scripts[outName] = readFileSync(`examples/expected/${outName}`, 'utf8')
  })
})

describe('e2e', () => {
  describe.each(examples)('%s example', (name, expectedNames) => {
    transpile(scripts[name], (filename, output) => {
      it('should produce correct output filename', () => {
        expect(expectedNames).toContain(filename)
      })

      it(`should produce correct output content for ${filename}`, () => {
        expect(output).toBe(scripts[filename])
      })
    }, `examples/${name}`)
  })
})
