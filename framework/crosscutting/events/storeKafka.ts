import { Kafka } from 'kafkajs';

import Metadata from './integration/metadata';
import EventAttiv from './integration/eventAttiv';
import Attivlogger from '../logging/logger';
import messages from '../messages/message';
import IStoreBase from './integration/IStoreBase';

export default class StoreKafka implements IStoreBase {
  private subscribes: Array<EventAttiv> = [];

  private consumers: Object = {};

  private kafka: Kafka;

  constructor(subscribes: Array<EventAttiv>) {
    this.subscribes = subscribes;
  }

  init() {
    const brokers = [...process.env.KAFKA_BROKERS_ENDPOINT.split(',')];

    this.kafka = new Kafka({
      clientId: process.env.KAFKA_CLIENT_IDENTIFIER,
      brokers,
    });

    this.subscribes.forEach(subscribe => {
      if (subscribe.listener && subscribe.name) {
        this.addListener(subscribe.listener, subscribe.name);
      }
    });
  }

  /**
   * Funcao responsavel por inserir um novo registro no topico
   * @param nameHandler Nome do topico
   * @param metadata Objeto que deve ser inserido na fila
   */
  async send(nameHandler: string, metadata: Metadata) {
    Attivlogger.info(`${messages.KAFKA.MESSAGE_SEND}: ${nameHandler}`);

    const producer = this.kafka.producer();

    await producer.connect();

    await producer.send({
      topic: nameHandler,
      messages: [{ value: JSON.stringify(metadata) }],
    });

    await producer.disconnect();
  }

  /**
   * Criação de uma novo consumidor
   * @param handler Função que deve ser executada quando uma nova mensagem chegar no topico, caso essa função seja passada o desenvolvedor é responsavel
   * pelo que acontecer com a informação enviada
   * @param nameHandler Nome do grupo @ tópico que será criado
   */
  async addListener(handler: any, nameHandler: string) {
    const [groupId, topic] = nameHandler.split('@');

    const consumer = this.kafka.consumer({ groupId });

    await consumer.connect();
    await consumer.subscribe({ topic });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const messageBody = JSON.parse(message.value.toString());

        handler(messageBody, topic, partition);
      },
    });

    this.consumers[nameHandler] = consumer;
  }

  /**
   * Metodo responsavel por retornar todas as filas criadas
   */
  getChannels() {
    return this.subscribes.map(subscribe => subscribe.name);
  }

  /**
   * Método responsavel por retornar todas as mensagens da fila
   * @param queueName Nome da fila
   */
  getMessagesQueue(nameHandler: string) {
    throw new Error(messages.all.METHOD_NOT_IMPLEMENTED);
  }

  /**
   * Método responsável por se desinscrever de um tópico
   * @param nameHandler Nome da fila
   */
  async unsubscribe(nameHandler: string) {
    if (!this.consumers[nameHandler]) {
      throw new Error(`${messages.errorHandler.NOT_FOUND}: ${nameHandler}`);
    }

    await this.consumers[nameHandler].disconnect();
    delete this.consumers[nameHandler];
  }

  /**
   * Metodo responsavel por enviar a mesma mensagem para todas as filas existentes
   */
  sendAll(metadata: Metadata) {
    return Promise.all(this.getChannels().map(channelName => this.send(channelName, metadata)));
  }
}
