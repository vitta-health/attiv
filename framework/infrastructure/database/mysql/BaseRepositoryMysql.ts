import IRepositoryGeneric from '../IRepositoryGeneric';
import { Model } from 'sequelize';

export default abstract class BaseRepositoryMysql<T> implements IRepositoryGeneric<T> {
  private model: Model<any, any>;

  constructor(model: any) {
    this.model = model;
  }

  async getAll() {
    return await this.model.findAll();
  }

  async create(item: T) {
    return await this.model.create(item);
  }
  async update(id: string, item: T) {
    return await this.model.update(item, {
      where: {
        id: id,
      },
    });
  }
  async delete(id: string) {
    return await this.model.destroy({
      where: { id },
    });
  }
  async find(item: T) {
    return await this.model.find(item);
  }
  async findOne(id: string) {
    return await this.model.findById(id);
  }
}
