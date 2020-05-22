"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuditLog {
    constructor() { }
    get user() {
        return this._user;
    }
    get operationType() {
        return this._operationType;
    }
    get registerTable() {
        return this._registerTable;
    }
    get prevValues() {
        return this._prevValues;
    }
    get newValues() {
        return this._newValues;
    }
    set user(user) {
        this._user = user;
    }
    set operationType(operationType) {
        this._operationType = operationType;
    }
    set registerTable(registerTable) {
        this._registerTable = registerTable;
    }
    set prevValues(prevValues) {
        this._prevValues = prevValues;
    }
    set newValues(newValues) {
        this._newValues = newValues;
    }
}
exports.default = AuditLog;
