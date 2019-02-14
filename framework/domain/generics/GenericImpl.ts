import IGeneric from './IGeneric';
import IRepositoryGeneric from '../../infrastructure/database/IRepositoryGeneric';

export default abstract class GenericImpl<T> implements IGeneric<T> {
  private genericRepository: IRepositoryGeneric<T>;

  constructor(genericRepository: IRepositoryGeneric<T>) {
    this.genericRepository = genericRepository;
  }

  async create(item: T) {
    return await this.genericRepository.create(item);
  }
  async update(id: string, item: T) {
    return await this.genericRepository.update(id, item);
  }
  async delete(id: string) {
    return await this.genericRepository.delete(id);
  }
  async find(item: T) {
    return await this.genericRepository.find(item);
  }
  async findOne(id: string) {
    return await this.genericRepository.findOne(id);
  }
  async getAll() {
    return await this.genericRepository.getAll();
  }
}
