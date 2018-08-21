import { StateVariable, Store } from '../Store'

/**
 * Base class to represent data structure of an AST node.
 */
abstract class Constructor {
  /**
   * Location of AST node in source script file.
   */
  public location?: { filename: string, line: number, column: number }

  /**
   * Evaluates the AST node inside the given store instance.
   * @param  store Store instance.
   * @return       Evaluation result.
   */
  public abstract evaluate(store: Store): StateVariable

  /**
   * Throws a reference error.
   * @param  variable Variable identifier to output.
   */
  protected throwReferenceError(variable: string) {
    this.throwError(ReferenceError, `${variable} is not defined`)
  }

  /**
   * Throws a type error.
   * @param  variable Variable identifier to output.
   * @param  type     Variable type expected.
   */
  protected throwTypeError(variable: string, type: string) {
    this.throwError(TypeError, `${variable} is not ${type}`)
  }

  /**
   * Formats error message and throws error.
   * @param  type    Error type to throw.
   * @param  message Error message to output.
   */
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
