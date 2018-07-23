function processNumber(input: string): number {
  return Number(input)
}

function processString(input: string): string {
  return input.slice(1, -1).replace(/\\(.)/g, '$1')
}

export { processNumber, processString }
export {
  Assignment, Block, ExportStatement, NodeAddition, NodeSelection,
} from '../Constructor'
export { Identifier, Literal } from '../Constructor/Expression'
export {
  AdditionOperation, SubtractionOperation,
} from '../Constructor/Expression/BinaryOperation'
