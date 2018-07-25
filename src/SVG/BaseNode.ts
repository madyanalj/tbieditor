import { PRESENTATION_PROPERTIES, Properties } from './'

abstract class BaseNode {
  public readonly properties: Properties = {}
  protected readonly defaultProperties = {}
  protected readonly abstract TAG: string

  public get attributes(): Array<[string, any]> {
    return Object.entries(this.properties)
  }

  private get filterdAttributes(): Array<[string, any]> {
    const defaults: Properties = {
      ...PRESENTATION_PROPERTIES,
      ...this.defaultProperties,
    }
    return this.attributes
      .filter(([name, value]) => {
        const defaultValue = defaults[name]
        return typeof defaultValue !== 'undefined' && defaultValue !== value
      })
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
