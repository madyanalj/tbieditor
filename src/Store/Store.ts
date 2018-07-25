import { BaseNode, SVGNode } from '../SVG'
import { State } from './'

const ROOT_IDENTIFIER = '#__ROOT'

class Store {
  private readonly state: State = { [ROOT_IDENTIFIER]: new SVGNode() }
  private selectedNode: string = ROOT_IDENTIFIER

  public get rootNode(): SVGNode {
    return this.state[ROOT_IDENTIFIER]
  }

  public setVariable(identifier: string, value: any): void {
    this.state[identifier] = value
  }

  public getVariable(identifier: string): any {
    return this.state[identifier]
  }

  public setNodeProperty(
    canvasIdentifier: string, propertyIdentifier: string, value: any,
  ): void {
    this.getVariable(canvasIdentifier).properties[propertyIdentifier] = value
  }

  public getNodeProperty(
    canvasIdentifier: string, propertyIdentifier: string,
  ): any {
    return this.getVariable(canvasIdentifier).properties[propertyIdentifier]
  }

  public setSelectedNodeProperty(identifier: string, value: any): void {
    this.setNodeProperty(this.selectedNode, identifier, value)
  }

  public getSelectedNodeProperty(identifier: string): any {
    return this.getNodeProperty(this.selectedNode, identifier)
  }

  public addNode(identifier: string, value: BaseNode): void {
    this.setVariable(identifier, value)
    this.rootNode.children.push(value)
  }

  public selectNode(identifier: string): void {
    this.selectedNode = identifier
  }

  public replaceNode(identifier: string, value: BaseNode): void {
    const oldValue = this.getVariable(identifier)
    const oldValueIndex = this.rootNode.children
      .findIndex((child) => child === oldValue)
    Object.assign(value.properties, oldValue.properties)
    this.setVariable(identifier, value)
    this.rootNode.children[oldValueIndex] = value
  }

  public replaceSelectedNode(value: BaseNode): void {
    this.replaceNode(this.selectedNode, value)
  }
}

export { Store }
