"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const APIError_1 = require("../../crosscutting/exceptions/APIError");
const BusinessError_1 = require("../../crosscutting/exceptions/BusinessError");
const ValidationError_1 = require("../../crosscutting/exceptions/ValidationError");
const UnauthenticatedError_1 = require("../../crosscutting/exceptions/UnauthenticatedError");
const NotFoundError_1 = require("../../crosscutting/exceptions/NotFoundError");
const ResponseRequest_1 = require("../../crosscutting/util/ResponseRequest");
const message_1 = require("../../crosscutting/messages/message");
const logger_1 = require("../../crosscutting/logging/logger");
const util = require("util");
function ErrorHandler(err, req, res, next) {
    const response = new ResponseRequest_1.default();
    response.status = 500;
    response.message = message_1.default.errorHandler.SERVER_ERROR;
    response.detais = err.stack;
    if (err instanceof NotFoundError_1.NotFoundError) {
        response.status = 404;
        response.message = message_1.default.errorHandler.NOT_FOUND;
    }
    if (err instanceof UnauthenticatedError_1.UnauthenticatedError) {
        response.status = 401;
        response.message = err.message || message_1.default.errorHandler.UNAUTHENTICATED;
    }
    if (err instanceof ValidationError_1.ValidationError) {
        response.status = 400;
        response.message = err.message || message_1.default.errorHandler.VALIDATION_ERROR;
        response.detais = err.errors.details || err.errors || {};
    }
    if (err instanceof BusinessError_1.BusinessError) {
        response.status = 400;
        response.message = err.message || message_1.default.errorHandler.BUSINESS_ERROR;
    }
    if (err instanceof APIError_1.APIError) {
        response.status = err.status || 400;
        response.message = err.message || message_1.default.errorHandler.API_ERROR;
        response.detais = err.stack;
    }
    logger_1.default.error(util.inspect(response));
    return res.status(response.status).json(response);
}
exports.ErrorHandler = ErrorHandler;
