"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attiv_1 = require("attiv");
const clientSchema_1 = require("../database/clientSchema");
class ClientRepository extends attiv_1.BaseRepositoryDynamo {
    constructor({ DbContextDynamo }) {
        super(clientSchema_1.default);
    }
}
exports.default = ClientRepository;
