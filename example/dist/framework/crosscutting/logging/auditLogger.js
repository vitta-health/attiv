"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const AuditLog_1 = require("../../domain/generics/AuditLog");
const AuditLogOperationType_1 = require("../../domain/generics/AuditLogOperationType");
const EventServiceProviderLogger_1 = require("./EventServiceProviderLogger");
const storeTypes_1 = require("../../crosscutting/events/storeTypes");
const metadata_1 = require("../../crosscutting/events/integration/metadata");
const logger_1 = require("./logger");
const util_1 = require("util");
let AudditLogger = /** @class */ (() => {
    class AudditLogger {
        constructor() { }
        static register(action, model, options) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if (options.transaction !== undefined) {
                        options.transaction.afterCommit(() => {
                            this.publishLog(action, model, options);
                        });
                    }
                    else {
                        this.publishLog(action, model, options);
                    }
                }
                catch (error) {
                    logger_1.default.error('Error registering audit log. Action= ${action} Options= ' + util_1.inspect(options) + ' ' + JSON.stringify(error));
                }
            });
        }
        static publishLog(action, model, options) {
            const auditLog = new AuditLog_1.default();
            auditLog.user = options.user;
            auditLog.operationType = action;
            auditLog.registerTable = model._modelOptions.name.plural;
            if (action === AuditLogOperationType_1.default.UPDATE) {
                auditLog.newValues = model.dataValues;
                auditLog.prevValues = model._previousDataValues;
            }
            else if (action === AuditLogOperationType_1.default.CREATE) {
                auditLog.newValues = model.dataValues;
            }
            else if (action === AuditLogOperationType_1.default.DELETE) {
                auditLog.prevValues = model._previousDataValues;
            }
            let metadata = new metadata_1.default();
            metadata.data = auditLog;
            this._queuePublisher.send(this._queueName, metadata);
        }
    }
    AudditLogger._queuePublisher = new EventServiceProviderLogger_1.default(storeTypes_1.default[process.env.AUDIT_LOG_STORE_TYPE]);
    AudditLogger._queueName = process.env.AUDIT_LOG_QUEUE_NAME;
    return AudditLogger;
})();
exports.default = AudditLogger;
