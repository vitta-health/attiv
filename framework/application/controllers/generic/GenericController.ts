import { Request, Response, Router } from 'express';
import IGenericController from './IGenericController';

export default abstract class GenericController<T> implements IGenericController {
  public nameService: string;

  constructor(nameService: string) {
    this.nameService = nameService;
  }

  public getRouter() {
    const router = Router();
    router.get('/', this.index.bind(this));
    router.get('/:id', this.show.bind(this));
    router.post('/', this.create.bind(this));
    router.put('/:id', this.update.bind(this));
    router.delete('/:id', this.delete.bind(this));

    return router;
  }

  protected getService(req: any) {
    return req.container.resolve(this.nameService);
  }

  async index(req: Request, res: Response, nextn) {
    try {
      return res.status(200).json(await this.getService(req).getAll());
    } catch (ex) {
      nextn(ex);
    }
  }

  async show(req: Request, res: Response, nextn: any) {
    try {
      return res.status(200).json(await this.getService(req).findOne(req.params.id));
    } catch (ex) {
      nextn(ex);
    }
  }

  async create(req: Request, res: Response, nextn) {
    try {
      const data = await this.getService(req).create(req.body);
      return res.status(200).json(data);
    } catch (ex) {
      nextn(ex);
    }
  }

  async update(req: Request, res: Response, nextn) {
    try {
      const data = await this.getService(req).update(req.params.id, req.body);
      return res.status(200).json(data);
    } catch (ex) {
      nextn(ex);
    }
  }

  async delete(req: Request, res: Response, nextn) {
    try {
      const data = await this.getService(req).delete(req.params.id);
      return res.status(200).json(data);
    } catch (ex) {
      nextn(ex);
    }
  }
}
