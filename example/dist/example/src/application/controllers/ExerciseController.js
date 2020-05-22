"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attiv_1 = require("attiv");
class ExerciseController extends attiv_1.GenericController {
    constructor() {
        super('exerciseService');
    }
    getRouter() {
        return super.getRouter();
    }
}
exports.default = ExerciseController;
