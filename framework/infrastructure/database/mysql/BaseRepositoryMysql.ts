import IRepositoryGeneric from '../IRepositoryGeneric';
import { Model, FindOptions } from 'sequelize';
import DbContext from '../DbContext';
import IQueryRequest from '../../../crosscutting/util/IQueryRequest';
import { APIError } from 'attiv';
import { messages } from 'attiv';

export default abstract class BaseRepositoryMysql<T> implements IRepositoryGeneric<T> {
  private model: Model<any, any>;
  protected DbContext: DbContext;
  private paginateParams: IQueryRequest;

  /**
   *
   * @param model Object modelo que sera usado para realizar as operacoes no banco de dados
   * @param DbContext Contexto do banco para controle de transacao
   * @param paginateParams Parametros enviados na requisicao, que sao usados para paginacao e filtro
   */
  constructor(model: any, DbContext: DbContext, paginateParams?: IQueryRequest) {
    this.model = model;
    this.DbContext = DbContext;

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
        attributes: [],
        includeAttributes: [],
        distinct: false,
      };
    } else {
      paginateParams.limit = this.verifyPageLimit(paginateParams.limit);
      paginateParams.pageSize = this.verifyPageLimit(paginateParams.pageSize);
      this.paginateParams = paginateParams;
    }
  }

  /**
   * Metodo responsavel por receber as condicoes de uma query personalizada e realizar paginacao
   * @param queryBuilder Query sequelize com wheres, includes e attributes
   */
  async paginate(queryBuilder?: FindOptions<T>) {
    const result = await this.model.findAndCountAll({
      transaction: this.DbContext.getTransaction(),
      ...queryBuilder,
      offset: this.paginateParams.offset,
      limit: this.paginateParams.limit,
      order: this.paginateParams.order,
    });

    const data = {
      paginate: true,
      total: result.count,
      page: this.paginateParams.page,
      pageSize: this.paginateParams.pageSize,
      pages: Math.ceil(result.count / this.paginateParams.pageSize),
      data: result.rows,
    };

    return data;
  }

  private verifyPageLimit(valor: number): number {
    const limit = parseInt(process.env.LIMIT_PAGINATION) || 10;
    return valor > limit ? limit : valor;
  }

  /**
   * Metodo responsavel por buscar todas as informacoes na base de dados
   * e retornar os dados paginado, com ou sem filtro, com ou sem includes e com ou ser ordenacao
   */

  async getAll() {
    const modelAttributes = this.model['rawAttributes'];

    const amountSearchQueryIncludes = this.amountSearchQueryIncludes(this.paginateParams);

    const searchableFields = this.searchableFields(amountSearchQueryIncludes, modelAttributes, this.paginateParams);

    const filter = {
      ...searchableFields,
      include: amountSearchQueryIncludes.queryIncludesList,
    };

    return this.paginate(filter);
  }

  async create(item: T) {
    return await this.model.create(item, { transaction: this.DbContext.getTransaction() });
  }

  async update(id: string, item: T) {
    return await this.model.update(item, {
      where: {
        id: id,
      },
      transaction: this.DbContext.getTransaction(),
    });
  }

  async delete(id: string) {
    return await this.model.destroy({
      where: { id },
      transaction: this.DbContext.getTransaction(),
    });
  }

  async find(item: T) {
    return await this.model.find(item);
  }

  async findOne(id: string) {
    const modelAttributes = this.model['rawAttributes'];

    const amountSearchQueryIncludes = this.amountSearchQueryIncludes(this.paginateParams);

    const searchableFields = this.searchableFields(amountSearchQueryIncludes, modelAttributes, this.paginateParams);

    const filter = {
      ...searchableFields,
      include: amountSearchQueryIncludes.queryIncludesList,
    };

    return await this.model.findOne({ ...filter });
  }

  public async beginTransaction() {
    await this.DbContext.beginTransaction();
  }

  public async commit() {
    await this.DbContext.commit();
  }

  public async rollback() {
    await this.DbContext.rollback();
  }

  searchableFields(amountSearchQueryIncludes, modelAttributes, queryParams: IQueryRequest) {
    const searchableFields = {};

    const excludeAttributes = [];

    Object.keys(modelAttributes).forEach(key => {
      if (modelAttributes[key]['hidden'] === true || (queryParams.attributes && !queryParams.attributes.includes(key))) {
        excludeAttributes.push(key);
      }
    });

    amountSearchQueryIncludes.filterQ.forEach(query => {
      const [key, value] = query.split('=');

      if (excludeAttributes.indexOf(key) >= 0) {
        throw new APIError(`${key} - ${messages.Filter.FIELD_HIDDEN_CONTEXT}`);
      }

      if (!value.length) {
        throw new APIError(`${key} - ${messages.Filter.VALUE_IS_NULL}`);
      }

      const typeAttributeName = modelAttributes[key]['type'].toString();

      switch (true) {
        case typeAttributeName.indexOf('VARCHAR') >= 0: {
          searchableFields[key] = { $like: `${value}%` };
          break;
        }
        case typeAttributeName.indexOf('DATE') >= 0: {
          searchableFields[key] = null;
          if (['true', 1, '1'].indexOf(value) >= 0) {
            searchableFields[key] = {
              $not: null,
            };
          }
          break;
        }
        case typeAttributeName.indexOf('TINYINT') >= 0: {
          searchableFields[key] = ['true', 1, '1'].indexOf(value) >= 0 ? 1 : 0;
          break;
        }
        default: {
          searchableFields[key] = value;
          break;
        }
      }
    });

    const distinct = !!queryParams.distinct;

    const queryBuilder = {
      attributes: {
        exclude: excludeAttributes,
      },
      where: { ...searchableFields },
      distinct,
    };

    return queryBuilder;
  }

  private amountSearchQueryIncludes(query: IQueryRequest) {
    let filterQ = [];

    if (query.fields !== undefined) {
      filterQ = Array.isArray(query.fields) ? query.fields : new Array(query.fields);
    }

    let queryIncludes = [];
    if (query.includes !== undefined) {
      queryIncludes = Array.isArray(query.includes) ? query.includes : new Array(query.includes);
    }

    const queryIncludesList = [];

    if (queryIncludes.length > 0) {
      queryIncludes.forEach(includeQuery => {
        let include = {
          required: query.includesRequired,
        };

        const [entity, alias] = includeQuery.split('.');

        const model = this.DbContext.getModel(entity);

        if (alias !== undefined) {
          include['as'] = alias;
        }

        include['model'] = model;
        include['attributes'] = {
          exclude: [],
        };

        const modelAttributes = !query.attributes ? query.attributes : model['rawAttributes'];

        Object.keys(modelAttributes).forEach(key => {
          if (modelAttributes[key]['hidden'] === true || (query.includeAttributes && !query.includeAttributes.includes(key))) {
            include['attributes'].exclude.push(key);
          }
        });

        const whereInclude = filterQ.filter(q => q.indexOf(entity) >= 0);

        let searchableFieldsIncludes = {};
        whereInclude.forEach(query => {
          filterQ.splice(filterQ.indexOf(query), 1);

          const [key, value] = query.split('=');
          const [, relationValue] = key.split('.');

          if (!value.length) {
            throw new APIError(`${key} - ${messages.Filter.VALUE_IS_NULL}`);
          }

          const typeAttributeName = modelAttributes[relationValue]['type'].toString();

          switch (true) {
            case typeAttributeName.indexOf('VARCHAR') >= 0: {
              searchableFieldsIncludes[relationValue] = { $like: `${value}%` };
              break;
            }
            case typeAttributeName.indexOf('DATE') >= 0: {
              searchableFieldsIncludes[relationValue] = null;
              if (['true', 1, '1'].indexOf(value) >= 0) {
                searchableFieldsIncludes[relationValue] = {
                  $not: null,
                };
              }
              break;
            }
            case typeAttributeName.indexOf('TINYINT') >= 0: {
              searchableFieldsIncludes[relationValue] = ['true', 1, '1'].indexOf(value) >= 0 ? 1 : 0;
              break;
            }
            default: {
              searchableFieldsIncludes[relationValue] = value;
              break;
            }
          }
        });

        include['where'] = { ...searchableFieldsIncludes };

        queryIncludesList.push(include);
      });
    }

    return { queryIncludesList, filterQ };
  }
}
