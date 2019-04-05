export default interface IRepositoryGeneric<T> {
    create(item: T): any;
    update(id: string, item: T): any;
    delete(id: string): any;
    find(item: T): any;
    findOne(id: string): any;
    getAll(query: string): any;
    beginTransaction(): any;
    commit(): any;
    rollback(): any;
}
