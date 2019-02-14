import { Request, Response, Router } from 'express';
import IGenericController from './IGenericController';
import ResponseRequest from '../../../crosscutting/util/ResponseRequest';
import IGeneric from '../../../domain/generics/IGeneric';

export default abstract class GenericController<T> implements IGenericController {
  public _service: IGeneric<T>;

  constructor(service: IGeneric<T>) {
    this._service = service;
  }

  public getRouter() {
    const router = Router();
    router.get('/', this.index.bind(this));
    router.post('/', this.create.bind(this));
    router.put('/:id', this.update.bind(this));
    router.delete('/:id', this.delete.bind(this));

    return router;
  }

  async index(req: Request, res: Response, nextn) {
    try {
      const resRequest = new ResponseRequest();
      resRequest.data = await this._service.getAll();
      return res.status(200).json(resRequest);
    } catch (ex) {
      nextn(ex);
    }
  }

  async create(req: Request, res: Response, nextn) {
    try {
      const data = await this._service.create(req.body);
      return res.status(200).json(data);
    } catch (ex) {
      nextn(ex);
    }
  }

  async update(req: Request, res: Response, nextn) {
    try {
      const data = await this._service.update(req.params.id, req.body);
      return res.status(200).json(data);
    } catch (ex) {
      nextn(ex);
    }
  }

  async delete(req: Request, res: Response, nextn) {
    try {
      const data = await this._service.delete(req.params.id);
      return res.status(200).json(data);
    } catch (ex) {
      nextn(ex);
    }
  }
}
