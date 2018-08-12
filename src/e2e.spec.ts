import { readFileSync } from 'fs'
import { transpile } from './Transpiler'

const examples = [
  ['1-house.tbi', ['1-house.svg']],
  ['2-kcl.tbi', ['2-kcl.svg']],
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
    let i = 0
    transpile(scripts[name], (filename, output) => {
      it(`should produce correct output filename of ${expectedNames[i]}`, () => {
        expect(filename).toBe(expectedNames[i])
      })

      it(`should produce correct output for ${expectedNames[i]}`, () => {
        expect(output).toBe(scripts[expectedNames[i++]])
      })
    })
  })
})
