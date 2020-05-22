"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attiv_1 = require("attiv");
const models_1 = require("../database/models");
class MedicineRepository extends attiv_1.BaseRepositoryMysql {
    constructor({ DbContext, paginateParams }) {
        super(models_1.Medicine, DbContext, paginateParams);
    }
}
exports.default = MedicineRepository;
