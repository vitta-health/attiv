export default interface IQueryRequest {
  page: number;
  limit: number;
  offset: number;
  pageSize: number;
  fields: any;
  includes: Array<String>;
  order: Array<any>;
  includesRequired: boolean;
  user: any;
  attributes: Array<String>;
  includeAttributes: Array<String>;
  distinct: boolean;
  exclusiveStartKey: string;
}
