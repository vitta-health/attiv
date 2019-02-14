import { Request, Response } from 'express';

export default interface IGenericController {
  index(req: Request, res: Response, nextn);
  create(req: Request, res: Response, nextn);
  update(req: Request, res: Response, nextn);
  delete(req: Request, res: Response, nextn);
  getRouter();
}
