import { IDataStore } from '..';

export type RepoContext = {
  store: IDataStore;
  translate: (key: string) => string;
};
