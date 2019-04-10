import IRepositoryGeneric from '../IRepositoryGeneric';
import { Model } from 'sequelize';
import DbContext from '../DbContext';
import IQueryRequest from '../../../crosscutting/util/IQueryRequest';

export default abstract class BaseRepositoryMysql<T> implements IRepositoryGeneric<T> {
  private model: Model<any, any>;
  private DbContext: DbContext;
  private paginateParams: IQueryRequest;
  
  constructor(model: any, DbContext: DbContext , paginateParams?: IQueryRequest) {
    this.model = model;
    this.DbContext = DbContext;

    if(paginateParams === undefined){
      paginateParams.page = 1;
      paginateParams.limit = 10;
      paginateParams.offset = 1;
      paginateParams.pageSize = 10;
    }

    this.paginateParams = paginateParams;
  }

  /**
   * Metodo responsavel por receber as condicoes de uma query personalizada e realizar paginacao
   * @param builderQuery Query sequelize com wheres, includes e attributes
   * @param paginateParans Objeto recebido pela injecao de dependencia
   */
  async paginate(builderQuery: Object){
    
    const result = await this.model.findAndCountAll({
      transaction: this.DbContext.getTransaction(),
      ...builderQuery,
      offset: this.paginateParams.offset,
      limit: this.paginateParams.limit,
      order: this.paginateParams.order
    });

    const data = {
      paginate: true,
      total: result.count,
      page: this.paginateParams.page,
      pageSize: this.paginateParams.pageSize,
      pages: Math.ceil(result.count / this.paginateParams.pageSize),
      data: result.rows
    };

    return data;
  }

  async getAll() {
   
    const amountSearchQueryIncludes = this.amountSearchQueryIncludes(this.paginateParams);

    const searchableFields = {};
    amountSearchQueryIncludes.filterQ.forEach(query => {
      const filter = query.split("=");
      searchableFields[filter[0]] = filter[1];
    });
   
    const filter = {
      where: {
        ...searchableFields
      },
      include: amountSearchQueryIncludes.queryIncludesList,
    }

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

  private amountSearchQueryIncludes(query: IQueryRequest){
     
    let filterQ = [];

    if(query.fields !== undefined){
      filterQ = Array.isArray(query.fields) ? query.fields : new Array(query.fields);
    }

    let queryIncludes = [];
    if(query.includes !== undefined ) {
      queryIncludes = Array.isArray(query.includes) ?  query.includes :  new Array(query.includes)
    }

    const queryIncludesList = [];

    if ( queryIncludes.length > 0 ) {

      let include = {
        required:false
      };

      queryIncludes.forEach(includeQuery => {
        const model = this.DbContext.getModel(includeQuery);
        include['model'] = model;

        const whereInclude = filterQ.filter(q => q.indexOf(includeQuery) >= 0);

        let searchableFieldsIncludes = {};
        whereInclude.forEach(query => {
          filterQ.splice(filterQ.indexOf(query) , 1);
          const filter = query.split("=");
          const field = filter[0].split(".");
          searchableFieldsIncludes[field[1]] = filter[1];
        });
        
        include['where'] = { ...searchableFieldsIncludes };

      }); 

      queryIncludesList.push(include);
    }

    return { queryIncludesList , filterQ };
  }
}
