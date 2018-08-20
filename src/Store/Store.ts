import { BaseNode, SVGNode } from '../SVG'
import { State } from './'

const ROOT_IDENTIFIER = '#__ROOT'

/**
 * Contains the data structure of the AST evaluation state.
 */
class Store {
  /**
   * State of AST evaluation.
   */
  private readonly state: State = { [ROOT_IDENTIFIER]: new SVGNode() }

  /**
   * Identifier of currently selected image node.
   */
  private selectedNode: string = ROOT_IDENTIFIER

  /**
   * Getter method for the root SVG node.
   * @return root SVG node.
   */
  public get rootNode(): SVGNode {
    return this.state[ROOT_IDENTIFIER]
  }

  /**
   * Sets the value of a state variable.
   * @param identifier Identifier of variable to set.
   * @param value      Value to set.
   */
  public setVariable(identifier: string, value: any): void {
    this.state[identifier] = value
  }

  /**
   * Gets the value of a state variable.
   * @param  identifier Identifier of variable.
   * @return            Value of variable.
   */
  public getVariable(identifier: string): any {
    return this.state[identifier]
  }

  /**
   * Sets the value of the property of an image node.
   * @param canvasIdentifier   Identifier of image node.
   * @param propertyIdentifier Identifier of property.
   * @param value              Value to set for the image node property.
   */
  public setNodeProperty(
    canvasIdentifier: string, propertyIdentifier: string, value: any,
  ): void {
    this.getVariable(canvasIdentifier).properties[propertyIdentifier] = value
  }

  /**
   * Gets the value of the property of an image node.
   * @param canvasIdentifier   Identifier of image node.
   * @param propertyIdentifier Identifier of property.
   * @return                   Value of the image node property.
   */
  public getNodeProperty(
    canvasIdentifier: string, propertyIdentifier: string,
  ): any {
    return this.getVariable(canvasIdentifier).properties[propertyIdentifier]
  }

  /**
   * Sets the value of a property of the selected image node.
   * @param identifier Identifier of property.
   * @param value      Value of property.
   */
  public setSelectedNodeProperty(identifier: string, value: any): void {
    this.setNodeProperty(this.selectedNode, identifier, value)
  }

  /**
   * Gets the value of a property of the selected image node.
   * @param  identifier Identifier of property.
   * @return            Value of property.
   */
  public getSelectedNodeProperty(identifier: string): any {
    return this.getNodeProperty(this.selectedNode, identifier)
  }

  /**
   * Adds a new image node to the root node.
   * @param identifier Identifier of new image node.
   * @param value      Value of new image node.
   */
  public addNode(identifier: string, value: BaseNode): void {
    this.setVariable(identifier, value)
    this.rootNode.children.push(value)
  }

  /**
   * Sets the currently selected node identifier.
   * @param identifier The identifier of new selected node.
   */
  public selectNode(identifier: string): void {
    this.selectedNode = identifier
  }

  /**
   * Replaces an image node in state, maintaining properties previously set.
   * @param identifier Identifier of image node.
   * @param value      Value of new image node.
   */
  public replaceNode(identifier: string, value: BaseNode): void {
    const oldValue = this.getVariable(identifier)
    const oldValueIndex = this.rootNode.children
      .findIndex((child) => child === oldValue)
    Object.assign(value.properties, oldValue.properties)
    this.setVariable(identifier, value)
    this.rootNode.children[oldValueIndex] = value
  }

  /**
   * Replaces selected image node.
   * @param value Value of new image node.
   */
  public replaceSelectedNode(value: BaseNode): void {
    this.replaceNode(this.selectedNode, value)
  }
}

export { Store }
