import AuditLog from '../../domain/generics/AuditLog';
import DBOperationType from '../../domain/generics/AuditLogOperationType';
import EventServiceProviderAudditLogger from './EventServiceProviderLogger';
import StoreType from '../../crosscutting/events/storeTypes';
import Metadata from '../../crosscutting/events/integration/metadata';
import logger from './logger';
import { inspect } from 'util';

export default class AudditLogger {
  static _queuePublisher: EventServiceProviderAudditLogger = new EventServiceProviderAudditLogger(
    StoreType[process.env.AUDIT_LOG_STORE_TYPE],
  );

  static _queueName = process.env.AUDIT_LOG_QUEUE_NAME;

  constructor() {}

  static async register(action: DBOperationType, model: any, options: any) {
    try {
      if (options.transaction !== undefined) {
        options.transaction.afterCommit(() => {
          this.publishLog(action, model, options);
        });
      } else {
        this.publishLog(action, model, options);
      }
    } catch (error) {
      logger.error(
        'Error registering audit log. Action=' + action + ' Options= ' + inspect(options) + ' ' + JSON.stringify(error),
      );
    }
  }

  private static publishLog(action: DBOperationType, model: any, options: any) {
    const auditLog = new AuditLog();

    auditLog.user = options.user;
    auditLog.operationType = action;
    auditLog.registerTable = model._modelOptions.name.plural;

    if (action === DBOperationType.UPDATE) {
      auditLog.newValues = model.dataValues;
      auditLog.prevValues = model._previousDataValues;
    } else if (action === DBOperationType.CREATE) {
      auditLog.newValues = model.dataValues;
    } else if (action === DBOperationType.DELETE) {
      auditLog.prevValues = model._previousDataValues;
    }

    let metadata = new Metadata();
    metadata.data = auditLog;

    this._queuePublisher.send(this._queueName, metadata);
  }
}
