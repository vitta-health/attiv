"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attiv_1 = require("attiv");
class ClientController extends attiv_1.GenericController {
    constructor() {
        super('clientService');
    }
    getRouter() {
        return super.getRouter();
    }
}
exports.default = ClientController;
