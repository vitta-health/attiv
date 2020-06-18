import Metadata from './metadata';

export default interface IStoreBase {
  init();
  send(nameHandler: string, metadata: Metadata): Promise<void>;
  addListener(handler: any, nameHandler: string);
  getChannels();
  getMessagesQueue(nameHandler: string);
  unsubscribe(nameHandler: string);
  sendAll(metadata: Metadata);
}
