"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseHandler = void 0;
const __1 = require("../..");
const message_1 = require("../../crosscutting/messages/message");
function responseHandler(req, res, next) {
    const json_ = res.json;
    let DbContext;
    if (req.container && req.container.has('db')) {
        DbContext = req.container.resolve('DbContext');
    }
    res.json = function (data) {
        if (data === null) {
            data = {};
        }
        if (DbContext && DbContext.getTransaction() != null) {
            DbContext.rollback();
            throw new Error(message_1.default.responseHandler.EXIST_TRANSACTION_OPEN);
        }
        if (res.statusCode == 200) {
            const resRequest = new __1.ResponseRequest();
            if (data.paginate !== undefined && data.paginate === true) {
                resRequest.page = data.page;
                resRequest.pageSize = data.pageSize;
                resRequest.pages = data.pages;
                resRequest.total = data.total;
                resRequest.data = data.data;
            }
            else {
                resRequest.data = data;
            }
            json_.call(res, resRequest);
        }
        else {
            json_.call(res, data);
        }
    };
    next();
}
exports.responseHandler = responseHandler;
