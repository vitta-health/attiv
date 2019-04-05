import { Request, Response } from 'express';
export default interface IGenericController {
    index(req: Request, res: Response, nextn: any): any;
    create(req: Request, res: Response, nextn: any): any;
    update(req: Request, res: Response, nextn: any): any;
    delete(req: Request, res: Response, nextn: any): any;
    getRouter(): any;
}
