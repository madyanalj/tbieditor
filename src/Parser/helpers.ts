export { Assignment, Block } from '../Constructor'
export { Identifier, Literal } from '../Constructor/Expression'

function processNumber(input: string): number {
  return Number(input)
}

function processString(input: string): string {
  return input.slice(1, -1).replace(/\\(.)/g, '$1')
}

function processBoolean(input: string): boolean {
  return input === 'true'
}

export { processNumber, processString, processBoolean }
