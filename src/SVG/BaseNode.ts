import { DEFAULT_SVG_ATTRIBUTES } from './'

abstract class BaseNode {
  public readonly properties = {}
  protected readonly abstract TAG: string

  public get attributes(): Array<[string, any]> {
    return Object.entries(this.properties)
  }

  private get filterdAttributes(): Array<[string, any]> {
    return this.attributes
      .filter(([name, value]) => DEFAULT_SVG_ATTRIBUTES[name] !== value)
  }

  public generate(): string {
    return `<${this.TAG + this.generateAttributes()} />`
  }

  protected generateAttributes() {
    return this.filterdAttributes
      .map(([name, value]) => ` ${name}="${value}"`)
      .join('')
  }
}

export { BaseNode }
