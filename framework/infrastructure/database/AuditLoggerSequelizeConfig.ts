import AuditLogger from '../../crosscutting/logging/auditLogger';
import DBOperationType from '../../domain/generics/AuditLogOperationType';

export default class AuditLoggerSequelizeConfig {
  private _hooks = {
    afterCreate: (instance, options) => {
      AuditLogger.registerAuditLog(DBOperationType.CREATE, instance, options);
    },
    afterUpdate: (instance, options) => {
      AuditLogger.registerAuditLog(DBOperationType.UPDATE, instance, options);
    },
    afterDestroy: (instance, options) => {
      AuditLogger.registerAuditLog(DBOperationType.DELETE, instance, options);
    },
  };

  constructor() {}

  get hooks() {
    return this._hooks;
  }
}
