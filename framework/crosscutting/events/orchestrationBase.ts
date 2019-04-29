import Metadados from './integration/metadados';
import { EventEmitter } from 'events';
import EventAttiv from './integration/eventAttiv';
import IOrchestrationBase from './integration/IOrchestrationBase';

var emitter = require('events').EventEmitter;

export default class OrchestrationBase implements IOrchestrationBase {
  private emitterEvent: EventEmitter;

  private subscribes: Array<EventAttiv> = [];

  constructor() {
    this.emitterEvent = new emitter();
  }

  init() {
    this.subscribes.forEach(subscribe => {
      this.addListener(subscribe.listener, subscribe.listener.name);
    });
  }

  /**
   * Funcao responsavel por inserir um novo registro na fila
   * @param queueName Nome da fila
   * @param metadado Objeto que deve ser inserido na fila
   */
  send(nameHandler: string, metadado: Metadados) {
    this.emitterEvent.emit(nameHandler, metadado);
  }

  /**
   * Criação de uma nova fila
   * @param queueName Nome da fila que será criada
   * @param callback Função que deve ser executada quando uma nova mensagem chegar na fila, caso essa função seja passada o desenvolvedor é responsavel
   * pelo que acontecer com a informação enviada
   */
  addListener(handler: any, nameHandler?: string) {
    this.emitterEvent.addListener(nameHandler !== undefined ? nameHandler : handler.name, handler);
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
  getMessagesQueue(handler: Function) {
    return this.emitterEvent.listeners(handler.name);
  }

  unsubscribe(handler: Function) {
    this.emitterEvent.removeListener(handler.name, () => {});
  }

  /**
   * Metodo responsavel por enviar a mesma mensagem para todas as filas existentes
   */
  sendAll(metadados: Metadados) {
    this.getChannels().forEach(channelName => {
      this.emitterEvent.emit(channelName, metadados);
    });
  }
}
