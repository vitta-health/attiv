import { GenericImpl, IGeneric } from 'attiv';

import ITaskService from '../interface/ITaskService';
import Task from '../../entities/Task';
import ITaskRepository from '../../irepositories/ITaskRepository';

export default class TaskService extends GenericImpl<Task> implements ITaskService, IGeneric<Task> {
  private taskRepository: ITaskRepository;
  constructor({ taskRepository }) {
    super(taskRepository, Task);
    this.taskRepository = taskRepository;
  }

  getFindTaskByTitle(name: string) {
    return this.taskRepository.getFindTaskByTitle(name);
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

  async create(item) {
    const task = new Task(item);
    await this.genericRepository.beginTransaction();
    const resp = await this.genericRepository.create(task);
    this.genericRepository.commit();
    return resp;
  }
}
