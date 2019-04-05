"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validator = require("class-validator");
const ValidationError_1 = require("../../crosscutting/exceptions/ValidationError");
const message_1 = require("../../crosscutting/messages/message");
class BaseEntity {
    constructor(args) {
        if (args) {
            Object.assign(this, args);
            this.isValid();
        }
    }
    isValid() {
        const isValid = validator.validateSync(this, { validationError: { target: false }, forbidNonWhitelisted: true });
        if (isValid.length > 0) {
            throw new ValidationError_1.ValidationError(isValid.map(err => {
                return { variable: err.property, messages: err.constraints };
            }), message_1.default.errorHandler.VALIDATION_ERROR);
        }
        return true;
    }
}
exports.default = BaseEntity;
