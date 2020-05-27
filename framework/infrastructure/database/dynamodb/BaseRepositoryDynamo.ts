import { APIError } from '../../../crosscutting/exceptions/APIError';
import { IRepositoryGeneric } from '../../..';
import messages from '../../../crosscutting/messages/message';
import IQueryRequest from '../../../crosscutting/util/IQueryRequest';

export default abstract class BaseRepositoryDynamo<T> implements IRepositoryGeneric<T>{
  private model: any;
  private paginateParams: IQueryRequest;

  constructor(model: any, paginateParams?: IQueryRequest) {
    this.model = model;

    if (paginateParams === undefined) {
      this.paginateParams = {
        page: 1,
        limit: parseInt(process.env.LIMIT_PAGINATION) || 10,
        offset: 0,
        pageSize: parseInt(process.env.LIMIT_PAGINATION) || 10,
        fields: [],
        includes: [],
        order: [],
        includesRequired: false,
        user: {},
        attributes: [],
        includeAttributes: [],
        distinct: false,
        exclusiveStartKey: ''
      };
    } else {
      paginateParams.limit = this.verifyPageLimit(paginateParams.limit);
      paginateParams.pageSize = this.verifyPageLimit(paginateParams.pageSize);
      this.paginateParams = paginateParams;
    }
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
    let result = [];
    let totalItems = 0;
    const { fields, limit, exclusiveStartKey } = this.paginateParams;

    if (!fields.length) {
      totalItems = await this.model.scan().select('COUNT').exec().promise();

      if (exclusiveStartKey) {
        result = await this.model.scan().startKey(exclusiveStartKey).limit(limit).exec().promise();
      } else {
        result = await this.model.scan().limit(limit).exec().promise();
      }

    } else {
      const obj = {};

      fields.forEach(element => {
        const [key, value] = element.split('=');
        obj[key] = value;
      });

      const attributeNames = this.getExpressionAttributeNames(obj);
      const attributeValues = this.getExpressionAttributeValues(obj);
      const filterExpression = this.getFilterExpression(attributeNames);

      totalItems = await this.model.scan().filterExpression(filterExpression)
        .expressionAttributeValues(attributeValues)
        .expressionAttributeNames(attributeNames).select('COUNT').exec().promise();

      if (exclusiveStartKey) {
        result = await this.model.scan().filterExpression(filterExpression)
          .expressionAttributeValues(attributeValues)
          .expressionAttributeNames(attributeNames).startKey(exclusiveStartKey).limit(limit).exec().promise();
      } else {
        result = await this.model.scan().filterExpression(filterExpression)
          .expressionAttributeValues(attributeValues)
          .expressionAttributeNames(attributeNames).limit(limit).loadAll().exec().promise();
      }

    }

    const { Items, LastEvaluatedKey } = result[0];
    const { Count } = totalItems[0];

    result['data'] = Items;
    result['lastEvaluatedKey'] = LastEvaluatedKey.uuid;
    result['total'] = Count;

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
    console.log('condição', condition);
    return condition;
  }

  async paginate(result: any) {
    const data = {
      paginate: true,
      total: result.total,
      pageSize: this.paginateParams.pageSize,
      pages: Math.ceil(result.total / this.paginateParams.pageSize),
      data: result.data,
      lastEvaluatedKey: result.lastEvaluatedKey
    };
    return data;
  }


  private verifyPageLimit(valor: number): number {
    const limit = parseInt(process.env.LIMIT_PAGINATION) || 10;
    return valor > limit ? limit : valor;
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