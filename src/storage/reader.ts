import { BaseModel, ModelFactory } from '../models';
import { QueryOptions } from './query-options';
import { LooseObject } from '../typings';

export interface Reader {
  getAll: <T extends BaseModel>(
    data?: LooseObject,
    options?: QueryOptions,
    modelFactory?: ModelFactory<T>
  ) => Promise<T[]>;

  findById: <T extends BaseModel>(
    id: string,
    options?: QueryOptions,
    modelFactory?: ModelFactory<T>
  ) => Promise<T>;

  findOne: <T extends BaseModel>(
    data?: LooseObject,
    options?: QueryOptions,
    modelFactory?: ModelFactory<T>
  ) => Promise<T>;

  count: <T extends BaseModel>(
    data?: LooseObject,
    modelFactory?: ModelFactory<T>
  ) => Promise<number>;
}
