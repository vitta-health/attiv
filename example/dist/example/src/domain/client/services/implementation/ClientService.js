"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attiv_1 = require("attiv");
const Client_1 = require("../../entity/Client");
class ClientService extends attiv_1.GenericImpl {
    constructor({ clientRepository }) {
        super(clientRepository, Client_1.default);
    }
}
exports.default = ClientService;
