import { PRESENTATION_PROPERTIES, Properties } from './'

/**
 * Base class representing the data structure of SVG nodes.
 */
abstract class BaseNode {
  /**
   * Properties of SVG node.
   */
  public readonly properties: Properties = {}

  /**
   * Default properties for the current node tag type.
   */
  protected readonly defaultProperties = {}

  /**
   * Tag of SVG node.
   */
  protected readonly abstract TAG: string

  /**
   * Gets attributes of SVG node.
   * @return Attributes.
   */
  public get attributes(): Array<[string, any]> {
    return Object.entries(this.properties)
  }

  /**
   * Gets attributes including common presentation ones without including ones
   * that are not necessary (due to their values being the same as the default).
   * @return Filtered attributes.
   */
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

  /**
   * Produces the SVG source of the SVG node as a string.
   * @return SVG node source.
   */
  public generate(): string {
    return `<${this.TAG + this.generateAttributes()} />`
  }

  /**
   * Produces the SVG source of the SVG node attributes as a string.
   * @return SVG node attribute source.
   */
  protected generateAttributes() {
    return this.filterdAttributes
      .map(([name, value]) => ` ${name}="${value}"`)
      .join('')
  }
}

export { BaseNode }
