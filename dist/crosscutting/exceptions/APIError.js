"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * HTTP ERROR
 */
class APIError extends Error {
    constructor(message, status = 500) {
        super(message);
        this.status = status;
    }
}
exports.APIError = APIError;
