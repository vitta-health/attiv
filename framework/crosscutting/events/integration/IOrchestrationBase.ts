import Metadados from './metadados';

export default interface IOrchestrationBase {
  init();
  send(nameHandler: string, metadado: Metadados);
  addListener(handler: any, nameHandler?: string);
  getChannels();
  getMessagesQueue(handler: Function);
  unsubscribe(handler: Function);
  sendAll(metadados: Metadados);
}
