"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = require("../../../crosscutting/messages/message");
class BaseRepositoryMongo {
    constructor(model) {
        this.model = model;
    }
    create(item) {
        return new this.model(item).save();
    }
    update(id, item) {
        return this.model.findByIdAndUpdate(id, item, { new: true });
    }
    delete(id) {
        return this.model.findByIdAndDelete(id);
    }
    find(item) {
        return this.model.find(item);
    }
    findOne(id) {
        return this.model.findById(id);
    }
    getAll() {
        return this.model.find().exec();
    }
    beginTransaction() {
        throw new Error(message_1.default.DbContextoMongo.NOT_HAVE_TRANSACTION);
    }
    commit() {
        throw new Error(message_1.default.DbContextoMongo.NOT_HAVE_TRANSACTION);
    }
    rollback() {
        throw new Error(message_1.default.DbContextoMongo.NOT_HAVE_TRANSACTION);
    }
}
exports.default = BaseRepositoryMongo;
