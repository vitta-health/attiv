"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dynamo = require("dynamodb");
const Joi = require("joi");
const clientSchema = dynamo.define('Client', {
    hashKey: 'id',
    timestamps: true,
    schema: {
        name: Joi.string(),
        cpf: Joi.string(),
        age: Joi.number(),
    }
});
exports.default = clientSchema;
