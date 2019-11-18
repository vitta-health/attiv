import AuditLogger from '../../crosscutting/logging/auditLogger';
import DBOperationType from '../../domain/generics/AuditLogOperationType';

export default class AuditLoggerSequelizeConfig {
  private _hooks = {
    afterCreate: this.afterCreate.bind(this),
    afterUpdate: this.afterUpdate.bind(this),
    afterDestroy: this.afterDestroy.bind(this),
  };

  constructor() {}

  afterCreate(instance, options) {
    AuditLogger.register(DBOperationType.CREATE, instance, options);
  }

  afterUpdate(instance, options) {
    AuditLogger.register(DBOperationType.UPDATE, instance, options);
  }

  afterDestroy(instance, options) {
    AuditLogger.register(DBOperationType.DELETE, instance, options);
  }

  get hooks() {
    return this._hooks;
  }
}
