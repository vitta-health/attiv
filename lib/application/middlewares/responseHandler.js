"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = require("../../crosscutting/messages/message");
const __1 = require("../..");
function responseHandler(req, res, next) {
    const json_ = res.json;
    const DbContext = req.container.resolve('DbContext');
    res.json = function (data) {
        if (DbContext.getTransaction() != null) {
            DbContext.rollback();
            throw new Error(message_1.default.responseHandler.EXIST_TRANSACTION_OPEN);
        }
        if (res.statusCode == 200) {
            const resRequest = new __1.ResponseRequest();
            resRequest.data = data;
            json_.call(res, resRequest);
        }
        else {
            json_.call(res, data);
        }
    };
    next();
}
exports.responseHandler = responseHandler;
