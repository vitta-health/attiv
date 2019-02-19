import IRepositoryGeneric from '../IRepositoryGeneric';
import { Mongoose } from 'mongoose';
import { APIError } from '../../../crosscutting/exceptions/APIError';

export default abstract class BaseRepositoryMongo<T> {
  private model: any;

  constructor(model: any) {
    this.model = model;
  }

  create(item: T) {
    return this.model.insert(item);
  }
  update(id: string, item: T) {
    throw new APIError('Method not implemented');
  }
  delete(id: string) {
    return this.model.remove({ id });
  }
  find(item: T) {
    return this.model.find(item);
  }
  findOne(id: string) {
    return this.model.find({ id });
  }
  getAll() {
    return this.model.find();
  }
}
