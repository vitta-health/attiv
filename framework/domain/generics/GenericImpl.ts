import IGeneric from './IGeneric';
import IRepositoryGeneric from '../../infrastructure/database/IRepositoryGeneric';

import Task from '../../../example/src/domain/task/entities/Task';

export default abstract class GenericImpl<T> implements IGeneric<T> {
  private genericRepository: IRepositoryGeneric<T>;
  private domain;

  constructor(genericRepository: IRepositoryGeneric<T>, type: new (args) => T) {
    this.genericRepository = genericRepository;
    this.domain = type;
  }

  async create(item: T) {
    return await this.genericRepository.create(new this.domain(item));
  }
  async update(id: string, item: T) {
    return await this.genericRepository.update(id, new this.domain(item));
  }
  async delete(id: string) {
    return await this.genericRepository.delete(id);
  }
  async find(item: T) {
    return await this.genericRepository.find(new this.domain(item));
  }
  async findOne(id: string) {
    return await this.genericRepository.findOne(id);
  }
  async getAll() {
    return await this.genericRepository.getAll();
  }
}
