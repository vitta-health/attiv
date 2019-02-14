"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const APIError_1 = require("../../../crosscutting/exceptions/APIError");
class BaseRepositoryMongo {
    constructor(model) {
        this.model = model;
    }
    create(item) {
        return this.model.insert(item);
    }
    update(id, item) {
        throw new APIError_1.APIError('Method not implemented');
    }
    delete(id) {
        return this.model.remove({ id });
    }
    find(item) {
        return this.model.find(item);
    }
    findOne(id) {
        return this.model.find({ id });
    }
    getAll() {
        return this.model.find();
    }
}
exports.default = BaseRepositoryMongo;
