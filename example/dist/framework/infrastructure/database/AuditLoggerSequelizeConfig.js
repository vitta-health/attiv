"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auditLogger_1 = require("../../crosscutting/logging/auditLogger");
const AuditLogOperationType_1 = require("../../domain/generics/AuditLogOperationType");
class AuditLoggerSequelizeConfig {
    constructor() {
        this._hooks = {
            afterCreate: this.afterCreate.bind(this),
            afterUpdate: this.afterUpdate.bind(this),
            afterDestroy: this.afterDestroy.bind(this),
        };
    }
    afterCreate(instance, options) {
        auditLogger_1.default.register(AuditLogOperationType_1.default.CREATE, instance, options);
    }
    afterUpdate(instance, options) {
        auditLogger_1.default.register(AuditLogOperationType_1.default.UPDATE, instance, options);
    }
    afterDestroy(instance, options) {
        auditLogger_1.default.register(AuditLogOperationType_1.default.DELETE, instance, options);
    }
    get hooks() {
        return this._hooks;
    }
}
exports.default = AuditLoggerSequelizeConfig;
