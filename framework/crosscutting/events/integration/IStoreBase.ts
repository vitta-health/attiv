import Metadados from './metadados';

export default interface IStoreBase {
  init();
  send(nameHandler: string, metadado: Metadados);
  addListener(handler: any, nameHandler: string);
  getChannels();
  getMessagesQueue(nameHandler: string);
  unsubscribe(nameHandler: string);
  sendAll(metadados: Metadados);
}
