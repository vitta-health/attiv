import IOrchestrationBase from './integration/IOrchestrationBase';
import Metadados from './integration/metadados';
import * as amqp from 'amqplib/callback_api';
import EventAttiv from './integration/eventAttiv';
import Attivlogger from '../logging/logger';

export default class OrchestrationRabbit implements IOrchestrationBase {
  private connetionRabbit: amqp.Connection;

  private subscribes: Array<EventAttiv> = [];

  constructor(subscribes: Array<EventAttiv>) {
    this.subscribes = subscribes;
    amqp.connect(process.env.RABBITMQ_HOST, (err, conn) => {
      this.connetionRabbit = conn;
      this.init();
    });
  }

  init() {
    this.subscribes.forEach(subscribe => {
      this.addListener(subscribe.listener, subscribe.listener.name);
    });
  }
  send(nameHandler: string, metadado: Metadados) {
    this.connetionRabbit.createChannel(function(err, ch: amqp.Channel) {
      var ex = nameHandler;
      var msg = JSON.stringify(metadado);
      ch.assertExchange(ex, 'direct', { durable: true });
      ch.publish(ex, '', new Buffer(msg));
      Attivlogger.info(`Message send to RabbitMQ - Exchange: ${nameHandler}`);
    });
  }
  addListener(handler: any, nameHandler?: string) {
    const name = nameHandler !== undefined ? nameHandler : handler.name;
    this.connetionRabbit.createChannel(function(err, ch: amqp.Channel) {
      var ex = name;

      ch.assertExchange(ex, 'direct', { durable: true });

      ch.assertQueue('', { exclusive: true }, function(err, q) {
        Attivlogger.info(`[*] Waiting for messages in ${handler.name}`);
        ch.bindQueue(q.queue, ex, '');
        ch.consume(q.queue, handler, { noAck: true });
      });
    });
  }
  getChannels() {
    return this.subscribes;
  }
  getMessagesQueue(handler: Function) {
    throw new Error('Method not implemented.');
  }
  unsubscribe(handler: Function) {
    throw new Error('Method not implemented.');
  }
  sendAll(metadados: Metadados) {
    Attivlogger.info(`Send messages all channels`);
    this.subscribes.forEach(subscribe => {
      this.send(subscribe.listener, metadados);
    });
  }
}
