export default abstract class BaseRepositoryMongo<T> {
    private model;
    constructor(model: any);
    create(item: T): any;
    update(id: string, item: T): void;
    delete(id: string): any;
    find(item: T): any;
    findOne(id: string): any;
    getAll(): any;
}
