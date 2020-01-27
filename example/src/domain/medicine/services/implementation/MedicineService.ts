import { GenericImpl, IGeneric } from 'attiv';

import IMedicineService from '../interface/IMedicineService';
import Medicine from '../../entities/Medicine';
import MedicineLaboratory from '../../entities/MedicineLaboratory';
import IMedicineRepository from '../../irepositories/IMedicineRepository';
import IMedicineLaboratoryRepository from '../../irepositories/IMedicineLaboratoryRepository';

export default class MedicineService extends GenericImpl<Medicine> implements IMedicineService, IGeneric<Medicine> {
    private medicineRepository: IMedicineRepository;
    private medicineLaboratoryRepository: IMedicineLaboratoryRepository;
    constructor({ medicineRepository, medicineLaboratoryRepository }) {
        super(medicineRepository, Medicine);
        this.medicineRepository = medicineRepository;
        this.medicineLaboratoryRepository = medicineLaboratoryRepository;
    }

    async create(item) {
        const medicine = new Medicine(item);
        await this.medicineRepository.beginTransaction();

        try {
            const resp: Medicine = await this.medicineRepository.create(medicine);

            if (item.laboratoryId) {
                const laboratory = new MedicineLaboratory();
                laboratory.laboratoryId = item.laboratoryId;
                laboratory.medicineId = resp.id;
                await this.medicineLaboratoryRepository.create(laboratory);
            }

            await this.medicineRepository.commit();
            return resp;
        } catch (ex) {
            console.error(ex);
            await this.medicineRepository.rollback();
        }
    }
}
