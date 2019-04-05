import IGeneric from "./IGeneric";
import IRepositoryGeneric from "../../infrastructure/database/IRepositoryGeneric";
export default abstract class GenericImpl<T> implements IGeneric<T> {
    protected genericRepository: IRepositoryGeneric<T>;
    private entity;
    constructor(genericRepository: IRepositoryGeneric<T>, entityType: new (args: any) => T);
    create(item: T): Promise<any>;
    update(id: string, item: T): Promise<any>;
    delete(id: string): Promise<any>;
    find(item: T): Promise<any>;
    findOne(id: string): Promise<any>;
    getAll(query: string): Promise<any>;
}
