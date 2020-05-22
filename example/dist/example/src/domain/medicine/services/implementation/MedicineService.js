"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const attiv_1 = require("attiv");
const Medicine_1 = require("../../entities/Medicine");
const MedicineLaboratory_1 = require("../../entities/MedicineLaboratory");
class MedicineService extends attiv_1.GenericImpl {
    constructor({ medicineRepository, medicineLaboratoryRepository }) {
        super(medicineRepository, Medicine_1.default);
        this.medicineRepository = medicineRepository;
        this.medicineLaboratoryRepository = medicineLaboratoryRepository;
    }
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const medicine = new Medicine_1.default(item);
            yield this.medicineRepository.beginTransaction();
            try {
                const resp = yield this.medicineRepository.create(medicine);
                if (item.laboratoryId) {
                    const laboratory = new MedicineLaboratory_1.default();
                    laboratory.laboratoryId = item.laboratoryId;
                    laboratory.medicineId = resp.id;
                    yield this.medicineLaboratoryRepository.create(laboratory);
                }
                yield this.medicineRepository.commit();
                return resp;
            }
            catch (ex) {
                console.error(ex);
                yield this.medicineRepository.rollback();
            }
        });
    }
}
exports.default = MedicineService;
