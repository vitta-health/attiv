"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages = {
    errorHandler: {
        NOT_FOUND: 'NOT FOUND',
        UNAUTHENTICATED: 'UNAUTHENTICATED',
        SERVER_ERROR: 'SERVER ERROR',
        VALIDATION_ERROR: 'VALIDATION ERROR',
        BUSINESS_ERROR: 'BUSINESS ERROR',
        API_ERROR: 'API ERROR',
    },
    successHandler: {
        SUCCESS: 'SUCCESS',
    },
    responseHandler: {
        EXIST_TRANSACTION_OPEN: 'THERE IS OPEN TRANSACTION',
    },
    DbContexto: {
        NOT_TRANSACTION: 'NO TRANSACTION OPEN',
    },
};
exports.default = messages;
