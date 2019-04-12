import { BaseRepositoryMysql, IRepositoryGeneric } from 'attiv';
import TaskDomain from '../../domain/task/entities/Task';
import ITaskRepository from '../../domain/task/irepositories/ITaskRepository';

import { Task } from '../database/models';

export default class TaskRepository extends BaseRepositoryMysql<TaskDomain>
  implements ITaskRepository, IRepositoryGeneric<TaskDomain> {
  private _db;

  constructor({ DbContext, db, paginateParams }) {
    super(Task, DbContext, paginateParams);
    this._db = db;
  }

  async getFindTaskByTitle(title: string) {
    const queryBuilder = {
      where: {
        title: {
          $like: '%' + title + '%',
        },
      },
      include: [
        {
          as: 'sub_tasks',
          model: this._db.SubTasks,
        },
      ],
    };
    return this.paginate(queryBuilder);
  }
}
