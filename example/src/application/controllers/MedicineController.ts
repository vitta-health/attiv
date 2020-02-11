import { GenericController, IGenericController } from 'attiv';
import IMedicineService from '../../domain/medicine/services/interface/IMedicineService';

export default class MedicineController extends GenericController<IMedicineService> implements IGenericController {
    constructor() {
        super('medicineService');
    }

    public getRouter() {
        return super.getRouter();
    }
}
