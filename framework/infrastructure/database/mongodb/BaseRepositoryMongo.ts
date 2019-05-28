import { APIError } from '../../../crosscutting/exceptions/APIError';
import { IRepositoryGeneric } from '../../..';
import messages from '../../../crosscutting/messages/message';

export default abstract class BaseRepositoryMongo<T> implements IRepositoryGeneric<T> {
  private model: any;

  constructor(model: any) {
    this.model = model;
  }

  create(item: T) {
    return new this.model(item).save();
  }
  update(id: string, item: T) {
    return this.model.findByIdAndUpdate(id, item, { new: true });
  }
  delete(id: string) {
    return this.model.findByIdAndDelete(id);
  }
  find(item: T) {
    return this.model.find(item);
  }
  findOne(id: string) {
    return this.model.findById(id);
  }
  getAll() {
    return this.model.find().exec();
  }

  beginTransaction() {
    throw new Error(messages.DbContextoMongo.NOT_HAVE_TRANSACTION);
  }
  commit() {
    throw new Error(messages.DbContextoMongo.NOT_HAVE_TRANSACTION);
  }
  rollback() {
    throw new Error(messages.DbContextoMongo.NOT_HAVE_TRANSACTION);
  }
}
