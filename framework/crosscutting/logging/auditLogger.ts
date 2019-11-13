import AuditLog from '../../domain/generics/AuditLog';
import DBOperationType from '../../domain/generics/AuditLogOperationType';
import EventServiceProviderAudditLogger from './EventServiceProviderLogger';
import StoreType from '../../crosscutting/events/storeTypes';
import Metadata from '../../crosscutting/events/integration/metadata';

export default class AudditLogger {
  static queuePublisher: EventServiceProviderAudditLogger = new EventServiceProviderAudditLogger(StoreType.SQS);

  static queueName = process.env.AUDIT_LOG_QUEUE_NAME;

  constructor() {}

  static async registerAuditLog(action: DBOperationType, model, options) {
    try {
      const auditLog = new AuditLog();

      if (typeof options !== undefined) {
        auditLog.userId = options.userId;
      }
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

      this.queuePublisher.send(this.queueName, metadata);
    } catch (error) {
      console.log('######## ERRO AO PUBLICAR OS LOGS NA FILA ######## ', error);
    }
  }
}
