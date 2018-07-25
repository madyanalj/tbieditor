declare module 'jison' {
  export class Parser {
    public $: any
    public _$: {
      range: [number, number],
      first_line: number,
      first_column: number,
    }
    constructor(grammar: string)
    public parse(program: string): any
    public performAction(): any
  }
}
