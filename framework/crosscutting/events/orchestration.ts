import IOrchestrationBase from './integration/IOrchestrationBase';
import OrchestrationRabbit from '../events/orchestrationRabbit';
import Metadados from './integration/metadados';
import OrchestrationBase from './orchestrationBase';
import EventAttiv from './integration/eventAttiv';

export default class Orchestration implements IOrchestrationBase {
  private orchestrationConfigInstance: IOrchestrationBase;

  static subscribes: Array<EventAttiv> = [];

  constructor(orchestrador: string) {
    switch (orchestrador) {
      case 'OrchestrationRabbit':
        this.orchestrationConfigInstance = new OrchestrationRabbit(Orchestration.subscribes);
        break;
      default:
        this.orchestrationConfigInstance = new OrchestrationBase(Orchestration.subscribes);
    }
  }

  static setSubscribes(subscribes: EventAttiv) {
    this.subscribes.push(subscribes);
  }

  getInstance() {
    return this.orchestrationConfigInstance;
  }

  init() {
    return this.orchestrationConfigInstance.init();
  }
  send(nameHandler: string, metadado: Metadados) {
    return this.orchestrationConfigInstance.send(nameHandler, metadado);
  }
  addListener(handler: any, nameHandler?: string) {
    return this.orchestrationConfigInstance.addListener(handler, nameHandler);
  }

  getChannels() {
    return this.orchestrationConfigInstance.getChannels();
  }
  getMessagesQueue(nameHandler: string) {
    return this.orchestrationConfigInstance.getMessagesQueue(nameHandler);
  }
  unsubscribe(nameHandler: string) {
    return this.orchestrationConfigInstance.unsubscribe(nameHandler);
  }
  sendAll(metadados: Metadados) {
    return this.orchestrationConfigInstance.sendAll(metadados);
  }
}
