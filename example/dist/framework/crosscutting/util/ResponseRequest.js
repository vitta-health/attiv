"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = require("../messages/message");
class ResponseRequest {
    constructor() {
        this.status = 200;
        this.message = message_1.default.successHandler.SUCCESS;
        this.details = {};
    }
}
exports.default = ResponseRequest;
