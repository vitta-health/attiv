"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const exerciseSchema = new mongoose.Schema({
    title: String,
    description: String,
    details: String,
});
const exerciseModel = mongoose.model('exercises', exerciseSchema);
exports.default = exerciseModel;
