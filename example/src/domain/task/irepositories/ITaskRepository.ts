import { IRepositoryGeneric } from 'vitta-api';
import Task from '../entities/Task';

export default interface ITaskRepository extends IRepositoryGeneric<Task> {}
