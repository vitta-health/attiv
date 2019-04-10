import { IRepositoryGeneric } from 'attiv';
import Task from '../entities/Task';

export default interface ITaskRepository extends IRepositoryGeneric<Task> {
    getFindTaskByTitle(name: string);
}
