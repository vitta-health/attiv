import Metadata from './integration/metadata';
import { EventEmitter } from 'events';
import EventAttiv from './integration/eventAttiv';
import IStoreBase from './integration/IStoreBase';
import Attivlogger from '../logging/logger';
import messages from '../messages/message';

const emitter = require('events').EventEmitter;

export default class StoreBase implements IStoreBase {
  private emitterEvent: EventEmitter;

  private subscribes: Array<EventAttiv> = [];

  constructor(subscribes: Array<EventAttiv>) {
    this.subscribes = subscribes;
    this.emitterEvent = new emitter();
    this.init();
  }

  init() {
    this.subscribes.forEach(subscribe => {
      this.addListener(subscribe.listener, subscribe.name);
    });
  }

  /**
   * Funcao responsavel por inserir um novo registro na fila
   * @param queueName Nome da fila
   * @param metadado Objeto que deve ser inserido na fila
   */
  async send(nameHandler: string, metadata: Metadata): Promise<void> {
    Attivlogger.info(`${messages.BASE_QUEUES.MESSAGE_SEND}: ${nameHandler}`);
    this.emitterEvent.emit(nameHandler, metadata);
  }

  /**
   * Criação de uma nova fila
   * @param queueName Nome da fila que será criada
   * @param callback Função que deve ser executada quando uma nova mensagem chegar na fila, caso essa função seja passada o desenvolvedor é responsavel
   * pelo que acontecer com a informação enviada
   */
  addListener(handler: any, nameHandler: string) {
    this.emitterEvent.addListener(nameHandler, handler);
  }

  /**
   * Metodo responsavel por retornar todas as filas criadas
   */
  getChannels() {
    return this.emitterEvent.eventNames();
  }

  /**
   * Método responsavel por retornar todas as mensagens da fila
   * @param queueName Nome da fila
   */
  getMessagesQueue(nameHandler: string) {
    return this.emitterEvent.listeners(nameHandler);
  }

  unsubscribe(nameHandler: string) {
    this.emitterEvent.removeListener(nameHandler, () => {});
  }

  /**
   * Metodo responsavel por enviar a mesma mensagem para todas as filas existentes
   */
  sendAll(metadata: Metadata) {
    this.getChannels().forEach(channelName => {
      this.emitterEvent.emit(channelName, metadata);
    });
  }
}
