"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attiv_1 = require("attiv");
class MedicineController extends attiv_1.GenericController {
    constructor() {
        super('medicineService');
    }
    getRouter() {
        return super.getRouter();
    }
}
exports.default = MedicineController;
