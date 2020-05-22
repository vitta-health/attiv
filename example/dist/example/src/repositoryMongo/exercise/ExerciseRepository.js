"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attiv_1 = require("attiv");
const exerciseSchema_1 = require("../database/exerciseSchema");
class ExerciseRepository extends attiv_1.BaseRepositoryMongo {
    constructor({ DbContextMongo }) {
        super(exerciseSchema_1.default);
    }
}
exports.default = ExerciseRepository;
