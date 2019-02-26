import IRepositoryGeneric from '../IRepositoryGeneric';
import { Model } from 'sequelize';
import DbContext from '../DbContext';

export default abstract class BaseRepositoryMysql<T> implements IRepositoryGeneric<T> {
  private model: Model<any, any>;
  private DbContext: DbContext;

  constructor(model: any, DbContext: DbContext) {
    this.model = model;
    this.DbContext = DbContext;
  }

  async getAll() {
    return await this.model.findAll({ transaction: this.DbContext.getTransaction() });
  }

  async create(item: T) {
    return await this.model.create(item, { transaction: this.DbContext.getTransaction() });
  }
  async update(id: string, item: T) {
    return await this.model.update(item, {
      where: {
        id: id,
      },
      transaction: this.DbContext.getTransaction(),
    });
  }
  async delete(id: string) {
    return await this.model.destroy({
      where: { id },
      transaction: this.DbContext.getTransaction(),
    });
  }
  async find(item: T) {
    return await this.model.find(item);
  }
  async findOne(id: string) {
    return await this.model.findById(id, { transaction: this.DbContext.getTransaction() });
  }

  public async beginTransaction() {
    await this.DbContext.beginTransaction();
  }

  public commit() {
    this.DbContext.commit();
  }

  public rollback() {
    this.DbContext.rollback();
  }
}
