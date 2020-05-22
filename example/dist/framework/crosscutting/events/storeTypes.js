"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StoreType;
(function (StoreType) {
    StoreType[StoreType["BASE"] = 1] = "BASE";
    StoreType[StoreType["RABBITMQ"] = 2] = "RABBITMQ";
    StoreType[StoreType["SQS"] = 3] = "SQS";
    StoreType[StoreType["KAFKA"] = 4] = "KAFKA";
})(StoreType || (StoreType = {}));
exports.default = StoreType;
