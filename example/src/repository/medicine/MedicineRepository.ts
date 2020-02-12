import { BaseRepositoryMysql, IRepositoryGeneric } from 'attiv';
import MedicineDomain from '../../domain/medicine/entities/Medicine';
import IMedicineRepository from '../../domain/medicine/irepositories/IMedicineRepository';

import { Medicine } from '../database/models';

export default class MedicineRepository extends BaseRepositoryMysql<MedicineDomain>
  implements IMedicineRepository, IRepositoryGeneric<MedicineDomain> {
  constructor({ DbContext, paginateParams }) {
    super(Medicine, DbContext, paginateParams);
  }
}
