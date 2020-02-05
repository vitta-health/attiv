import { GenericController, IGenericController } from 'attiv';
import ILaboratoryService from '../../domain/laboratory/services/interface/ILaboratoryService';

export default class LaboratoryController extends GenericController<ILaboratoryService> implements IGenericController {
    constructor() {
        super('laboratoryService');
    }

    public getRouter() {
        return super.getRouter();
    }
}
