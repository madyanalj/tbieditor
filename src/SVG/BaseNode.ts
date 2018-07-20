abstract class BaseNode {
  protected readonly abstract TAG: string

  constructor(
    public readonly attributes: { [key: string]: any },
  ) {}
}

export { BaseNode }
