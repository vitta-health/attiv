import { GenericImpl, IGeneric } from 'attiv';

import ILaboratoryService from '../interface/ILaboratoryService';
import Laboratory from '../../entities/Laboratory';
import ILaboratoryRepository from '../../irepositories/ILaboratoryRepository';

export default class LaboratoryService extends GenericImpl<Laboratory> implements ILaboratoryService, IGeneric<Laboratory> {
    private laboratoryRepository: ILaboratoryRepository;
    constructor({ laboratoryRepository }) {
        super(laboratoryRepository, Laboratory);
        this.laboratoryRepository = laboratoryRepository;
    }

    async create(item) {
        const laboratory = new Laboratory(item);
        await this.laboratoryRepository.beginTransaction();

        try {
            const resp = await this.laboratoryRepository.create(laboratory);
            await this.laboratoryRepository.commit();
            return resp;
        } catch (ex) {
            console.error(ex);
            await this.laboratoryRepository.rollback();
        }
    }
}
