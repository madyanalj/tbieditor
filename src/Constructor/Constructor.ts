import { StateVariable, Store } from '../Store'

abstract class Constructor {
  public location?: { filename: string, line: number, column: number }

  public abstract evaluate(store: Store): StateVariable

  protected throwReferenceError(variable: string) {
    this.throwError(ReferenceError, `${variable} is not defined`)
  }

  protected throwTypeError(variable: string, type: string) {
    this.throwError(TypeError, `${variable} is not ${type}`)
  }

  private throwError(type: any, message: string) {
    let finalMessage = message
    if (typeof this.location !== 'undefined') {
      finalMessage += '\n'
        + 'at ' + this.location.filename
        + ':' + this.location.line
        + ':' + this.location.column
    }
    const error = new type(finalMessage)
    delete error.stack
    throw error
  }
}

export { Constructor }
