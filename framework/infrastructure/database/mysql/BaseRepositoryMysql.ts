import IRepositoryGeneric from '../IRepositoryGeneric';
import { Model, FindOptions } from 'sequelize';
import DbContext from '../DbContext';
import IQueryRequest from '../../../crosscutting/util/IQueryRequest';

export default abstract class BaseRepositoryMysql<T> implements IRepositoryGeneric<T> {
  private model: Model<any, any>;
  private DbContext: DbContext;
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
      paginateParams.page = 1;
      paginateParams.limit = parseInt(process.env.LIMIT_PAGINATION) || 10;
      paginateParams.offset = paginateParams.page;
      paginateParams.pageSize = paginateParams.limit;
    }

    this.paginateParams = paginateParams;
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

  /**
   * Metodo responsavel por buscar todas as informacoes na base de dados
   * e retornar os dados paginado, com ou sem filtro, com ou sem includes e com ou ser ordenacao
   */
  async getAll() {
    const amountSearchQueryIncludes = this.amountSearchQueryIncludes(this.paginateParams);

    const searchableFields = {};
    amountSearchQueryIncludes.filterQ.forEach(query => {
      const [key, value] = query.split('=');

      if (!isNaN(value)) {
        searchableFields[key] = value;
      } else if (typeof value === 'string') {
        searchableFields[key] = {
          $like: `${value}%`,
        };
      } else {
        searchableFields[key] = value;
      }
    });

    const filter = {
      where: {
        ...searchableFields,
      },
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
    return await this.model.findById(id, { transaction: this.DbContext.getTransaction() });
  }

  public async beginTransaction() {
    await this.DbContext.beginTransaction();
  }

  public commit() {
    this.DbContext.commit();
  }

  public rollback() {
    this.DbContext.rollback();
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
      let include = {
        required: false,
      };

      queryIncludes.forEach(includeQuery => {
        const model = this.DbContext.getModel(includeQuery);
        include['model'] = model;

        const whereInclude = filterQ.filter(q => q.indexOf(includeQuery) >= 0);

        let searchableFieldsIncludes = {};
        whereInclude.forEach(query => {
          filterQ.splice(filterQ.indexOf(query), 1);

          const [key, value] = query.split('=');
          const [, relationValue] = key.split('.');

          if (!isNaN(value)) {
            searchableFieldsIncludes[relationValue] = value;
          } else if (typeof value === 'string') {
            searchableFieldsIncludes[relationValue] = {
              $like: `${value}%`,
            };
          } else {
            searchableFieldsIncludes[relationValue] = value;
          }
        });

        include['where'] = { ...searchableFieldsIncludes };
      });

      queryIncludesList.push(include);
    }

    return { queryIncludesList, filterQ };
  }
}
