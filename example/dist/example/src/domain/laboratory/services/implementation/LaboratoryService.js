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
const Laboratory_1 = require("../../entities/Laboratory");
class LaboratoryService extends attiv_1.GenericImpl {
    constructor({ laboratoryRepository }) {
        super(laboratoryRepository, Laboratory_1.default);
        this.laboratoryRepository = laboratoryRepository;
    }
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const laboratory = new Laboratory_1.default(item);
            yield this.laboratoryRepository.beginTransaction();
            try {
                const resp = yield this.laboratoryRepository.create(laboratory);
                yield this.laboratoryRepository.commit();
                return resp;
            }
            catch (ex) {
                console.error(ex);
                yield this.laboratoryRepository.rollback();
            }
        });
    }
}
exports.default = LaboratoryService;
