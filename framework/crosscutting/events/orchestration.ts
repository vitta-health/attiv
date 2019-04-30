import IStoreBase from './integration/IStoreBase';
import Metadados from './integration/metadados';
import EventAttiv from './integration/eventAttiv';

import StoreBase from './storeBase';
import StoreRabbitMQ from './storeRabbitMQ';

export default class Orchestration implements IStoreBase {
  private orchestrationConfigInstance: IStoreBase;

  static subscribes: Array<EventAttiv> = [];

  constructor(orchestrador: string) {
    switch (orchestrador) {
      case 'StoreRabbitMQ':
        this.orchestrationConfigInstance = new StoreRabbitMQ(Orchestration.subscribes);
        break;
      default:
        this.orchestrationConfigInstance = new StoreBase(Orchestration.subscribes);
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
