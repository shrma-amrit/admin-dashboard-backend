import { BaseModel, ModelFactory } from '../models';
import { DeleteResult } from './delete-result';
import { LooseObject } from '../typings';

export interface Writer {
  save: <T extends BaseModel>(
    entity: T,
    modelFactory?: ModelFactory<T>
  ) => Promise<T>;

  update: <T extends BaseModel>(
    filter: LooseObject,
    dataToUpdate: LooseObject,
    modelFactory?: ModelFactory<T>
  ) => Promise<T>;

  saveMany: <T extends BaseModel>(
    entities: T[],
    modelFactory?: ModelFactory<T>
  ) => Promise<T[]>;

  deleteMany: <T extends BaseModel>(
    filter: LooseObject,
    modelFactory?: ModelFactory<T>
  ) => Promise<DeleteResult>;
}
