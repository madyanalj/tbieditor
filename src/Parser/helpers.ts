export { Assignment, Block, NodeAddition, NodeSelection } from '../Constructor'
export { Identifier, Literal } from '../Constructor/Expression'

function processNumber(input: string): number {
  return Number(input)
}

function processString(input: string): string {
  return input.slice(1, -1).replace(/\\(.)/g, '$1')
}

export { processNumber, processString }
