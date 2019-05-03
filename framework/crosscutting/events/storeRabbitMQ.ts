import Metadata from './integration/metadata';
import * as amqp from 'amqplib/callback_api';
import EventAttiv from './integration/eventAttiv';
import Attivlogger from '../logging/logger';
import messages from '../messages/message';
import IStoreBase from './integration/IStoreBase';
import * as util from 'util';

export default class StoreRabbitMQ implements IStoreBase {
  private connetionRabbit: amqp.Connection;

  private subscribes: Array<EventAttiv> = [];

  constructor(subscribes: Array<EventAttiv>) {
    this.subscribes = subscribes;
  }

  init() {
    amqp.connect(process.env.RABBITMQ_HOST, (err, conn) => {
      if (err) {
        throw new Error(messages.RabbitMQ.CONNECTION_FAILED);
      }

      this.connetionRabbit = conn;
      this.subscribes.forEach(subscribe => {
        this.addListener(subscribe.listener, subscribe.name);
      });
    });
  }

  send(nameHandler: string, metadata: Metadata) {
    this.connetionRabbit.createChannel((err, channel: amqp.Channel) => {
      if (err) {
        throw new Error(util.inspect(err));
      }

      const ex = nameHandler;
      const msg = JSON.stringify(metadata);
      channel.assertQueue(ex);
      channel.sendToQueue(ex, new Buffer(msg));
      Attivlogger.info(`${messages.RabbitMQ.MESSAGE_SEND}: ${nameHandler}`);
    });
  }

  addListener(handler: Function, nameHandler: string) {
    this.connetionRabbit.createChannel((err, channel: amqp.Channel) => {
      if (err) {
        throw new Error(util.inspect(err));
      }

      const ex = nameHandler;
      channel.assertQueue(ex, { durable: true });
      channel.consume(ex, data => {
        let metadata: Metadata;

        if (data.content) {
          metadata = JSON.parse(data.content.toString('utf8'));
        } else {
          throw new Error(`${messages.RabbitMQ.MESSAGE_CONTENT_JSON_ERRO}`);
        }

        handler(metadata).then(
          response => {
            channel.ack(data);
            Attivlogger.info(`${messages.RabbitMQ.MESSAGE_SUCCESS}: ${nameHandler}`);
          },
          error => {
            Attivlogger.error(`${messages.RabbitMQ.MESSAGE_ERROR}: ${nameHandler} | ${error}`);
          },
        );
      });
    });
  }

  getChannels() {
    return this.subscribes;
  }

  getMessagesQueue(nameHandler: string) {
    throw new Error(messages.all.METHOD_NOT_IMPLEMENTED);
  }

  unsubscribe(nameHandler: string) {
    throw new Error(messages.all.METHOD_NOT_IMPLEMENTED);
  }

  sendAll(metadata: Metadata) {
    throw new Error(messages.all.METHOD_NOT_IMPLEMENTED);
  }
}
