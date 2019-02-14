export default interface IGeneric<T> {
  create(item: T);
  update(id: string, item: T);
  delete(id: string);
  find(item: T);
  findOne(id: string);
  getAll();
}
