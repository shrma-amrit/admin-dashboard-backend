import { Reader } from './reader';
import { Writer } from './writer';

export interface IDataStore extends Reader, Writer {
  toObjectId: (id: string) => any;
}
