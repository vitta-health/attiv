"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attiv_1 = require("attiv");
const models_1 = require("../database/models");
class LaboratoryRepository extends attiv_1.BaseRepositoryMysql {
    constructor({ DbContext, db, paginateParams, eventServiceProviderExample }) {
        super(models_1.Laboratory, DbContext, paginateParams);
        this._db = db;
        this.event = eventServiceProviderExample;
    }
}
exports.default = LaboratoryRepository;
