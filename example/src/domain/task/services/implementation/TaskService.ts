import { GenericImpl, IGeneric } from 'attiv';

import ITaskService from '../interface/ITaskService';
import Task from '../../entities/Task';

export default class TaskService extends GenericImpl<Task> implements ITaskService, IGeneric<Task> {
  constructor({ taskRepository , servico}) {
    super(taskRepository);
  }


  async create(item: Task) {
   await this.genericRepository.beginTransaction();
   const resp = await this.genericRepository.create(item);
   this.genericRepository.commit();
   return resp;
  }

}
