import { BaseRepositoryMysql, IRepositoryGeneric } from 'attiv';
import MedicineLaboratoryDomain from '../../domain/medicine/entities/MedicineLaboratory';
import IMedicineLaboratoryRepository from '../../domain/medicine/irepositories/IMedicineLaboratoryRepository';

import { MedicineLaboratory } from '../database/models';

export default class MedicineLaboratoryRepository extends BaseRepositoryMysql<MedicineLaboratoryDomain>
    implements IMedicineLaboratoryRepository, IRepositoryGeneric<MedicineLaboratoryDomain> {
    constructor({ DbContext, paginateParams }) {
        super(MedicineLaboratory, DbContext, paginateParams);
    }
}
