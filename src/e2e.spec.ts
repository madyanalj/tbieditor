import { readFileSync } from 'fs'
import { transpile } from './Transpiler'

const examples = [
  ['1-house.tbi', ['1-house.svg']],
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
  it.each(examples)('should produce correct output for %s', (name, expectedNames) => {
    let i = 0
    transpile(scripts[name], (filename, output) => {
      expect(filename).toBe(expectedNames[i])
      expect(output).toBe(scripts[expectedNames[i++]])
    })
  })
})
