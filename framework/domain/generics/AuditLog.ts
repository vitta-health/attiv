import DBOperationType from './AuditLogOperationType';

export default class AuditLog {
  private _user: string;

  private _operationType: DBOperationType;

  private _registerTable: string;

  private _prevValues: string;

  private _newValues: string;

  constructor() {}

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

  set user(user: string) {
    this._user = user;
  }

  set operationType(operationType: DBOperationType) {
    this._operationType = operationType;
  }

  set registerTable(registerTable: string) {
    this._registerTable = registerTable;
  }

  set prevValues(prevValues: string) {
    this._prevValues = prevValues;
  }

  set newValues(newValues: string) {
    this._newValues = newValues;
  }
}
