abstract class BaseNode {
  public readonly properties: { [key: string]: any } = {}
  protected readonly abstract TAG: string
}

export { BaseNode }
