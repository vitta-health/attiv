import Metadados from './metadados';

export default interface IOrchestrationBase {
  init();
  send(nameHandler: string, metadado: Metadados);
  addListener(handler: any, nameHandler: string);
  getChannels();
  getMessagesQueue(nameHandler: string);
  unsubscribe(nameHandler: string);
  sendAll(metadados: Metadados);
}
