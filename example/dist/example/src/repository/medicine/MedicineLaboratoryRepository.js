"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attiv_1 = require("attiv");
const models_1 = require("../database/models");
class MedicineLaboratoryRepository extends attiv_1.BaseRepositoryMysql {
    constructor({ DbContext, paginateParams }) {
        super(models_1.MedicineLaboratory, DbContext, paginateParams);
    }
}
exports.default = MedicineLaboratoryRepository;
