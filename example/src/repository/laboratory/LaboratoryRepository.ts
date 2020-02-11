import { BaseRepositoryMysql, IRepositoryGeneric } from 'attiv';
import LaboratoryDomain from '../../domain/laboratory/entities/Laboratory';
import ILaboratoryRepository from '../../domain/laboratory/irepositories/ILaboratoryRepository';

import { Laboratory } from '../database/models';

export default class LaboratoryRepository extends BaseRepositoryMysql<LaboratoryDomain>
    implements ILaboratoryRepository, IRepositoryGeneric<LaboratoryDomain> {
    private _db;
    private event;
    constructor({ DbContext, db, paginateParams, eventServiceProviderExample }) {
        super(Laboratory, DbContext, paginateParams);
        this._db = db;
        this.event = eventServiceProviderExample;
    }
}
