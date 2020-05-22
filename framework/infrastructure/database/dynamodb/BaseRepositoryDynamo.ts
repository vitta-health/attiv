import { APIError } from '../../../crosscutting/exceptions/APIError';
import { IRepositoryGeneric } from '../../..';
import messages from '../../../crosscutting/messages/message';
import IQueryRequest from '../../../crosscutting/util/IQueryRequest';

export default abstract class BaseRepositoryDynamo<T> implements IRepositoryGeneric<T>{
  private model: any;
  private paginateParams: IQueryRequest;

  constructor(model: any, paginateParams?: IQueryRequest) {
    this.model = model;
    this.paginateParams = paginateParams;
  }

  create(item: T) {
    return this.model.create(item);
  }
  update(id: string, item: T) {
    return this.model.update({ uuid: id, ...item });
  }
  delete(id: string) {
    return this.model.destroy({ uuid: id });
  }
  find(item: T) {
    return this.model.getItem(item);
  }
  findOne(id: string) {
    return this.model.get(id);
  }

  async getAll() {
    let allData = []
    let result = [];
    let totalItems = 0;
    const { page, pageSize, fields } = this.paginateParams;

    if (!fields.length) {
      result = await this.model.scan().loadAll().limit(pageSize).exec().promise();

    } else {
      const obj = {};

      fields.forEach(element => {
        const [key, value] = element.split('=');
        obj[key] = value;
      });

      const attributeNames = this.getExpressionAttributeNames(obj);
      const attributeValues = this.getExpressionAttributeValues(obj);
      const filterExpression = this.getFilterExpression(attributeNames);

      result = await this.model.scan().filterExpression(filterExpression)
        .expressionAttributeValues(attributeValues)
        .expressionAttributeNames(attributeNames).exec().promise();

    }

    result.forEach(page => {
      const items = page['Items'].map(item => item.attrs);
      totalItems += parseInt(page['Count']);
      allData = [...allData, items];
    });

    result['data'] = allData[page - 1];
    result['total'] = totalItems;

    return this.paginate(result);
  }

  getExpressionAttributeNames(obj: any) {
    const newObj = {}
    Object.keys(obj).forEach((key) => {
      newObj[`#${key}`] = key;
    });
    return newObj;
  }


  getExpressionAttributeValues(obj: any) {
    const newObj = {}
    Object.entries(obj).forEach(([key, value]) => {
      newObj[`:${key}`] = value;
    });
    return newObj;
  }

  getFilterExpression(names: any) {
    let condition = '';

    Object.values(names).forEach((name, index) => {
      if (index === 0) {
        condition += `begins_with(#${name}, :${name})`;
      } else {
        condition += ` AND begins_with(#${name}, :${name})`
      }
    });
    return condition;
  }

  async paginate(result: any) {
    const data = {
      paginate: true,
      total: result.total,
      page: this.paginateParams.page,
      pageSize: this.paginateParams.pageSize,
      pages: Math.ceil(result.total / this.paginateParams.pageSize),
      data: result.data,
    };

    return data;
  }

  beginTransaction() {
    throw new APIError(messages.DbContextDynamob.NOT_HAVE_TRANSACTION);
  }
  commit() {
    throw new APIError(messages.DbContextDynamob.NOT_HAVE_TRANSACTION);
  }
  rollback() {
    throw new APIError(messages.DbContextDynamob.NOT_HAVE_TRANSACTION);
  }

}