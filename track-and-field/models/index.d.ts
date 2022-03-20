import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type USER1MetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class USER1 {
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly imageUrl?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<USER1, USER1MetaData>);
  static copyOf(source: USER1, mutator: (draft: MutableModel<USER1, USER1MetaData>) => MutableModel<USER1, USER1MetaData> | void): USER1;
}