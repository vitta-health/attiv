import IOrchestrationBase from './integration/IOrchestrationBase';
import OrchestrationRabbit from '../events/orchestrationRabbit';
import Metadados from './integration/metadados';
import OrchestrationBase from './orchestrationBase';
import EventAttiv from './integration/eventAttiv';

export default class Orchestration implements IOrchestrationBase {
  private orchestrationConfigInstance: IOrchestrationBase;

  static subscribes: Array<EventAttiv> = [];

  constructor() {
    //const OrchestrationConfigEnv = process.env.ORCHESTRATION || 'OrchestrationBase';
    this.orchestrationConfigInstance = new OrchestrationRabbit(Orchestration.subscribes);
  }

  static setSubscribes(subscribes: EventAttiv) {
    this.subscribes.push(subscribes);
  }

  init() {
    this.orchestrationConfigInstance.init();
  }
  send(nameHandler: string, metadado: Metadados) {
    this.orchestrationConfigInstance.send(nameHandler, metadado);
  }
  addListener(handler: any, nameHandler?: string) {
    this.orchestrationConfigInstance.addListener(handler, nameHandler);
  }
  getChannels() {
    return this.orchestrationConfigInstance.getChannels();
  }
  getMessagesQueue(handler: Function) {
    return this.orchestrationConfigInstance.getMessagesQueue(handler);
  }
  unsubscribe(handler: Function) {
    return this.orchestrationConfigInstance.unsubscribe(handler);
  }
  sendAll(metadados: Metadados) {
    this.orchestrationConfigInstance.sendAll(metadados);
  }
}
