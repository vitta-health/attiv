import IRepositoryGeneric from "../IRepositoryGeneric";
import DbContext from "../DbContext";
export default abstract class BaseRepositoryMysql<T> implements IRepositoryGeneric<T> {
    private model;
    private DbContext;
    constructor(model: any, DbContext: DbContext);
    getAll(query: any): Promise<any[]>;
    create(item: T): Promise<any>;
    update(id: string, item: T): Promise<[number, any[]]>;
    delete(id: string): Promise<number>;
    find(item: T): Promise<any>;
    findOne(id: string): Promise<any>;
    beginTransaction(): Promise<void>;
    commit(): void;
    rollback(): void;
}
