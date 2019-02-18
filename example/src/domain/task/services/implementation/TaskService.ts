import { GenericImpl, IGeneric } from 'attiv';

import ITaskService from '../interface/ITaskService';
import Task from '../../entities/Task';

export default class TaskService extends GenericImpl<Task> implements ITaskService, IGeneric<Task> {
  constructor({ taskRepository }) {
    super(taskRepository);
  }
}
