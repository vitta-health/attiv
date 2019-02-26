import { GenericImpl, IGeneric } from 'attiv';

import ITaskService from '../interface/ITaskService';
import Task from '../../entities/Task';

export default class TaskService extends GenericImpl<Task> implements ITaskService, IGeneric<Task> {
  constructor({ taskRepository }) {
    super(taskRepository, Task);
  }

  createIsValid(item) {
    const task = new Task();
    task.title = item.title;
    task.description = item.description;
    task.email = item.email;

    if (task.isValid()) {
      return { message: 'Objeto valido!' };
    }
  }


  async create(item: Task) {
   await this.genericRepository.beginTransaction();
   const resp = await this.genericRepository.create(item);
   this.genericRepository.commit();
   return resp;
  }

}
