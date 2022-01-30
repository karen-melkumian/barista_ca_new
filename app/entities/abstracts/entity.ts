import * as shortUUID from "short-uuid";

export abstract class Entity<T> {
  protected readonly _id: string;
  protected props: T;

  constructor(props: T, id?: string) {
    this._id = id ? id : shortUUID.generate();
    this.props = props;
  }
}
