import { GenericController, IGenericController } from 'attiv';
import ITaskService from '../../domain/task/services/interface/ITaskService';

import { Router } from 'express';

export default class TaskController extends GenericController<ITaskService> implements IGenericController {
  private _taskService: ITaskService;

  constructor({ taskService }) {
    super(taskService);
    this._taskService = taskService;
  }

  public getRouter() {
    let router = Router();
    router = super.getRouter();
    router.get('/get', this.getAll.bind(this));
    router.post('/new', this.createIsValid.bind(this));

    return router;
  }

  async getAll(req: Request, res, nextn) {
    try {
      return res.status(200).json(await this._taskService.getAll());
    } catch (ex) {
      nextn(ex);
    }
  }

  async createIsValid(req: Request, res, nextn) {
    try {
      return res.status(200).json(await this._taskService.createIsValid(req.body));
    } catch (ex) {
      nextn(ex);
    }
  }
}
