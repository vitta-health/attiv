"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationError = void 0;
/**
 * VALIDATION ERROR
 */
class ValidationError extends Error {
    constructor(errors, message) {
        super(message);
        this.errors = errors;
    }
}
exports.ValidationError = ValidationError;
