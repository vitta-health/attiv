import IStoreBase from './integration/IStoreBase';
import Metadata from './integration/metadata';
import EventAttiv from './integration/eventAttiv';

import StoreBase from './storeBase';
import StoreRabbitMQ from './storeRabbitMQ';
import StoreType from './storeTypes';
import StoreSQS from './storeSqs';
import StoreKafka from './storeKafka';

export default class Orchestration implements IStoreBase {
  private orchestrationConfigInstance: IStoreBase;

  static subscribes: Array<EventAttiv> = [];

  constructor(orchestrador: StoreType) {
    switch (orchestrador) {
      case StoreType.RABBITMQ:
        this.orchestrationConfigInstance = new StoreRabbitMQ(Orchestration.subscribes);
        break;
      case StoreType.SQS:
        this.orchestrationConfigInstance = new StoreSQS(Orchestration.subscribes);
        break;
      case StoreType.KAFKA:
        this.orchestrationConfigInstance = new StoreKafka(Orchestration.subscribes);
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

  async send(nameHandler: string, metadata: Metadata): Promise<void> {
    return await this.orchestrationConfigInstance.send(nameHandler, metadata);
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

  sendAll(metadata: Metadata) {
    return this.orchestrationConfigInstance.sendAll(metadata);
  }
}
