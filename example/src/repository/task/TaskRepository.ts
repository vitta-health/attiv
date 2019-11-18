import { BaseRepositoryMysql, IRepositoryGeneric, Metadata } from 'attiv';
import TaskDomain from '../../domain/task/entities/Task';
import ITaskRepository from '../../domain/task/irepositories/ITaskRepository';

import { Task } from '../database/models';

export default class TaskRepository extends BaseRepositoryMysql<TaskDomain>
  implements ITaskRepository, IRepositoryGeneric<TaskDomain> {
  private _db;
  private event;
  constructor({ DbContext, db, paginateParams, eventServiceProviderExample, user }) {
    super(Task, DbContext, user, paginateParams);
    this._db = db;
    this.event = eventServiceProviderExample;
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

    const meta = new Metadata();
    meta.data = queryBuilder;
    meta.uniqueId = Math.random();
    this.event.send('destiny-AppListenersEventListener', meta);

    return this.paginate(queryBuilder);
  }
}
