"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const APIError_1 = require("../../../crosscutting/exceptions/APIError");
const message_1 = require("../../../crosscutting/messages/message");
class BaseRepositoryDynamo {
    constructor(model) {
        this.model = model;
    }
    create(item) {
        return new this.model.create(item);
    }
    update(id, item) {
        return new this.model.update(item);
    }
    delete(id) {
        return new this.model.destroy({ id });
    }
    find(item) {
        return new this.model.getItem(item);
    }
    findOne(id) {
        throw new Error("Method not implemented.");
    }
    getAll() {
        return new this.model.scan().loadAll();
    }
    beginTransaction() {
        throw new APIError_1.APIError(message_1.default.DbContextDynamob.NOT_HAVE_TRANSACTION);
    }
    commit() {
        throw new APIError_1.APIError(message_1.default.DbContextDynamob.NOT_HAVE_TRANSACTION);
    }
    rollback() {
        throw new APIError_1.APIError(message_1.default.DbContextDynamob.NOT_HAVE_TRANSACTION);
    }
}
exports.default = BaseRepositoryDynamo;
