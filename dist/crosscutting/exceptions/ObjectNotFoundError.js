"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NotFoundError_1 = require("./NotFoundError");
/**
 * OBJECT NOT FOUND
 */
class ObjectNotFoundError extends NotFoundError_1.NotFoundError {
    constructor() {
        super(...arguments);
        this.name = 'RecordNotFoundError';
    }
}
exports.ObjectNotFoundError = ObjectNotFoundError;
