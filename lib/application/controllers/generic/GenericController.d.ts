import { Request, Response } from "express";
import IGenericController from "./IGenericController";
export default abstract class GenericController<T> implements IGenericController {
    nameService: string;
    constructor(nameService: string);
    getRouter(): import("express-serve-static-core").Router;
    protected getService(req: any): any;
    index(req: Request, res: Response, nextn: any): Promise<import("express-serve-static-core").Response>;
    create(req: Request, res: Response, nextn: any): Promise<import("express-serve-static-core").Response>;
    update(req: Request, res: Response, nextn: any): Promise<import("express-serve-static-core").Response>;
    delete(req: Request, res: Response, nextn: any): Promise<import("express-serve-static-core").Response>;
}
