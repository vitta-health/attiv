"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attiv_1 = require("attiv");
const Exercise_1 = require("../../entity/Exercise");
class ExerciseService extends attiv_1.GenericImpl {
    constructor({ exerciseRepository }) {
        super(exerciseRepository, Exercise_1.default);
    }
}
exports.default = ExerciseService;
