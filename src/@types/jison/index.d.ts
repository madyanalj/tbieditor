declare module 'jison' {
  export class Parser {
    constructor(grammar: string)
    public parse(program: string): any
  }
}
