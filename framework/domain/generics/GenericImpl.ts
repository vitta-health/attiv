import IGeneric from './IGeneric';
import IRepositoryGeneric from '../../infrastructure/database/IRepositoryGeneric';

export default abstract class GenericImpl<T> implements IGeneric<T> {
  protected genericRepository: IRepositoryGeneric<T>;
  private entity;

  constructor(genericRepository: IRepositoryGeneric<T>, entityType: new (args) => T) {
    this.genericRepository = genericRepository;
    this.entity = entityType;
  }

  async create(item: T) {
    return await this.genericRepository.create(new this.entity(item));
  }
  async update(id: string, item: T) {
    return await this.genericRepository.update(id, new this.entity(item));
  }
  async delete(id: string) {
    return await this.genericRepository.delete(id);
  }
  async find(item: T) {
    return await this.genericRepository.find(new this.entity(item));
  }
  async findOne(id: string) {
    return await this.genericRepository.findOne(id);
  }
  async getAll() {
    return await this.genericRepository.getAll();
  }
}
