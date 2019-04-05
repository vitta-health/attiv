export default interface IGeneric<T> {
    create(item: T): any;
    update(id: string, item: T): any;
    delete(id: string): any;
    find(item: T): any;
    findOne(id: string): any;
    getAll(query: string): any;
}
