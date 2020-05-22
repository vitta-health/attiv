"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AuditLogOperationType;
(function (AuditLogOperationType) {
    AuditLogOperationType[AuditLogOperationType["CREATE"] = 0] = "CREATE";
    AuditLogOperationType[AuditLogOperationType["UPDATE"] = 1] = "UPDATE";
    AuditLogOperationType[AuditLogOperationType["DELETE"] = 2] = "DELETE";
})(AuditLogOperationType || (AuditLogOperationType = {}));
exports.default = AuditLogOperationType;
