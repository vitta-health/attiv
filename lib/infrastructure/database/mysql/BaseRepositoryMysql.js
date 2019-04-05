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
class BaseRepositoryMysql {
    constructor(model, DbContext) {
        this.model = model;
        this.DbContext = DbContext;
    }
    getAll(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const pageSize = query.limit || 10;
            const page = query.page || 1;
            const offset = (page - 1) * pageSize;
            const limit = pageSize;
            return yield this.model.findAll({
                limit: limit,
                offset: offset,
                transaction: this.DbContext.getTransaction(),
            });
        });
    }
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.create(item, {
                transaction: this.DbContext.getTransaction(),
            });
        });
    }
    update(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.update(item, {
                where: {
                    id: id,
                },
                transaction: this.DbContext.getTransaction(),
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.destroy({
                where: { id },
                transaction: this.DbContext.getTransaction(),
            });
        });
    }
    find(item) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.find(item);
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.findById(id, {
                transaction: this.DbContext.getTransaction(),
            });
        });
    }
    beginTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.DbContext.beginTransaction();
        });
    }
    commit() {
        this.DbContext.commit();
    }
    rollback() {
        this.DbContext.rollback();
    }
}
exports.default = BaseRepositoryMysql;
