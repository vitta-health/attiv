import { BaseRepositoryDynamo, IRepositoryGeneric } from 'attiv';
import Client from '../../domain/excercise/entity/Exercise';

import clientSchema from '../database/clientSchema';

export default class ClientRepository extends BaseRepositoryDynamo<Client> implements IRepositoryGeneric<Client> {
  constructor({ DbContextDynamo, paginateParams }) {
    super(clientSchema, paginateParams);
  }
}
