"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class GenericImpl {
    constructor(genericRepository) {
        this.genericRepository = genericRepository;
    }
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.genericRepository.create(item);
        });
    }
    update(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.genericRepository.update(id, item);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.genericRepository.delete(id);
        });
    }
    find(item) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.genericRepository.find(item);
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.genericRepository.findOne(id);
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.genericRepository.getAll();
        });
    }
}
exports.default = GenericImpl;
