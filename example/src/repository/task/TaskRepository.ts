import { BaseRepositoryMysql, IRepositoryGeneric } from 'attiv';
import TaskDomain from '../../domain/task/entities/Task';
import ITaskRepository from '../../domain/task/irepositories/ITaskRepository';

import { Task } from '../database/models';


export default class TaskRepository extends BaseRepositoryMysql<TaskDomain>
  implements ITaskRepository, IRepositoryGeneric<TaskDomain> {
    constructor({ DbContext , db }) {
      super(Task, DbContext, db);
    }
}
