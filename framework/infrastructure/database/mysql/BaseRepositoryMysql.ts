import IRepositoryGeneric from '../IRepositoryGeneric';
import { Model } from 'sequelize';
import DbContext from '../DbContext';
import IQueryRequest from '../../../crosscutting/util/IQueryRequest';

export default abstract class BaseRepositoryMysql<T> implements IRepositoryGeneric<T> {
  private model: Model<any, any>;
  private DbContext: DbContext;
  
  constructor(model: any, DbContext: DbContext) {
    this.model = model;
    this.DbContext = DbContext;
  }

  async getAll(query: IQueryRequest) {
    const fieldDefaultFilter = ['limit','page','includes','fields'];
      
    query.fields = [];

    Object.keys(query).forEach(keys => {
      if( fieldDefaultFilter.indexOf(keys) < 0 ) {
        query.fields.push(`${keys}=${query[keys]}`);
      }
    });

    const amountSearchQueryIncludes = this.amountSearchQueryIncludes(query);

    const searchableFields = {};
    amountSearchQueryIncludes.filterQ.forEach(query => {
      const filter = query.split("=");
      searchableFields[filter[0]] = filter[1];
    });

    const pageSize = parseInt(query.limit) || 10;
    const page = parseInt(query.page) || 1;

    const offset = (page - 1) * pageSize;
    const limit = pageSize;

    const result = await this.model.findAndCountAll({
      transaction: this.DbContext.getTransaction(),
      offset: offset,
      where: {
        ...searchableFields
      },
      include: amountSearchQueryIncludes.queryIncludesList,
      limit: limit,
    });

    const data = {
      paginate: true,
      total: result.count,
      page: page,
      pageSize: pageSize,
      pages: Math.ceil(result.count / pageSize),
      data: result.rows,
    };

    return data;
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
