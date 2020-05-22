"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attiv_1 = require("attiv");
class LaboratoryController extends attiv_1.GenericController {
    constructor() {
        super('laboratoryService');
    }
    getRouter() {
        return super.getRouter();
    }
}
exports.default = LaboratoryController;
