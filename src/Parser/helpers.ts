/**
 * Converts parsed string into number.
 * @param  input String of number to be processed.
 * @return       Number.
 */
function processNumber(input: string): number {
  return Number(input)
}

/**
 * Processes parsed string, removing quotes and escaping backslashes.
 * @param  input String to be processed.
 * @return       Processed string.
 */
function processString(input: string): string {
  return input.slice(1, -1).replace(/\\(.)/g, '$1')
}

export { processNumber, processString }
export {
  Assignment,
  Block,
  ExportStatement,
  ForLoop,
  IfStatement,
  NodeAddition,
  NodeSelection,
} from '../Constructor'
export {
  FunctionCall,
  FunctionDeclaration,
  Identifier,
  Literal,
  NotOperation,
} from '../Constructor/Expression'
export {
  AdditionOperation,
  AndOperation,
  DivisionOperation,
  EQOperation,
  GTEQOperation,
  GTOperation,
  IEQOperation,
  LTEQOperation,
  LTOperation,
  MemberOperation,
  MultiplicationOperation,
  OrOperation,
  SubtractionOperation,
} from '../Constructor/Expression/BinaryOperation'
