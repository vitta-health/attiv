import { BaseRepositoryMysql, IRepositoryGeneric } from 'attiv';
import TaskDomain from '../../domain/task/entities/Task';
import ITaskRepository from '../../domain/task/irepositories/ITaskRepository';

import { Task } from '../database/models';

export default class TaskRepository extends BaseRepositoryMysql<TaskDomain>
  implements ITaskRepository, IRepositoryGeneric<TaskDomain> {

    private _db;
    private _DbContext;
    constructor({ DbContext , paginateParams , db} ) {
      super(Task, DbContext , paginateParams);
      this._db = db;
      this._DbContext = DbContext;
    }

    async getFindTaskByTitle(title: string) {
      const queryBuilder = {
        where: {
          title: {
            [this._DbContext.db.Op.like]: '%' + title + '%'
          }
        },
        include: [{
          model: this._db.SubTasks
        }]
      }
      return this.paginate(queryBuilder);
    }
}
