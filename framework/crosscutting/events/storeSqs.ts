import Metadata from './integration/metadata';
import EventAttiv from './integration/eventAttiv';
import Attivlogger from '../logging/logger';
import messages from '../messages/message';
import IStoreBase from './integration/IStoreBase';
import * as AWS from 'aws-sdk';
import * as bluebird from 'bluebird';

class UrlChave {
  key: string;
  url: string;

  constructor(key: string, url: string) {
    this.key = key;
    this.url = url;
  }
}

export default class StoreSQS implements IStoreBase {
  private subscribes: Array<EventAttiv> = [];

  private UrlChaves = [];

  private SQS: any;

  private WaitTimeSeconds = 20;

  constructor(subscribes: Array<EventAttiv>) {
    this.subscribes = subscribes;
  }

  init() {
    AWS.config.credentials = new AWS.Credentials(
      process.env.aws_access_key_id,
      process.env.aws_secret_access_key,
      null,
    );
    AWS.config.update({ region: process.env.aws_region });
    this.SQS = new AWS.SQS({ apiVersion: '2012-11-05' });

    bluebird.promisifyAll(this.SQS, { suffix: 'Promise' });

    this.subscribes.forEach(subscribe => {
      this.addListener(subscribe.listener, subscribe.name);
    });
  }

  async send(nameHandler: string, metadata: Metadata) {
    try {
      let queueUrl = await this.getQueueUrl(nameHandler);

      const params = {
        MessageBody: JSON.stringify(metadata),
        QueueUrl: queueUrl,
      };
      Attivlogger.info(`${messages.SQS.MESSAGE_SEND}: ${nameHandler}`);
      return this.SQS.sendMessagePromise(params);
    } catch (ex) {
      Attivlogger.error(`${messages.SQS.MESSAGE_ERROR_SEND}: ${nameHandler}`);
      throw ex;
    }
  }

  getQueueUrl(nameHandler: string): Promise<string> {
    if (!this.SQS) throw new Error(`${messages.SQS.MESSAGE_ERROR_INIT}`);
    if (!nameHandler) {
      return null;
    } else if (!this.UrlChaves[nameHandler]) {
      const params = {
        QueueName: nameHandler,
      };
      return this.SQS.getQueueUrlPromise(params)
        .then(data => {
          this.UrlChaves[nameHandler] = data.QueueUrl;
          return this.UrlChaves[nameHandler];
        })
        .catch(error => {
          return Promise.resolve(null);
        });
    }

    return Promise.resolve(this.UrlChaves[nameHandler]);
  }

  async createQueue(nameHandler: string): Promise<string> {
    try {
      let queueUrl = await this.getQueueUrl(nameHandler);
      if (queueUrl) {
        return Promise.resolve(queueUrl);
      }

      const params = {
        QueueName: nameHandler,
        Attributes: {
          ReceiveMessageWaitTimeSeconds: this.WaitTimeSeconds,
        },
      };

      queueUrl = this.SQS.createQueuePromise(params);

      Attivlogger.info(`${messages.SQS.MESSAGE_CREATE_QUEUE}: ${nameHandler}`);

      return queueUrl;
    } catch (ex) {
      Attivlogger.error(`${messages.SQS.MESSAGE_ERROR_CREATE_QUEUE}: ${nameHandler}`);
      throw ex;
    }
  }

  async addListener(handler: Function, nameHandler: string) {
    let queueUrl: string;

    queueUrl = await this.getQueueUrl(nameHandler);
    if (!queueUrl) {
      queueUrl = await this.createQueue(nameHandler);
    }

    this.poll(nameHandler, handler);
    Attivlogger.info(`${messages.SQS.MESSAGE_LISTENER_QUEUE}: ${nameHandler}`);
  }

  async receiveMessages(nameHandler, options = {}) {
    return this.getQueueUrl(nameHandler).then(queueUrl => {
      if (queueUrl == null) throw new Error(`${messages.SQS.MESSAGE_ERROR_FIND_QUEUE} '${nameHandler}'`);

      const params = {
        QueueUrl: queueUrl,
        WaitTimeSeconds: this.WaitTimeSeconds,
      };

      return this.SQS.receiveMessagePromise(params).then(({ Messages: messages }) => {
        if (!messages) return null;

        let deserialized = { ReceiptHandle: '', Body: '' };

        if (messages.length > 0) {
          messages.forEach(message => {
            try {
              deserialized.ReceiptHandle = message.ReceiptHandle;
              deserialized.Body = JSON.parse(message.Body);
            } catch (error) {}
          });
        } else {
          deserialized = null;
        }

        return deserialized;
      });
    });
  }

  async deleteMessage(nameHandler, receiptHandle) {
    return this.getQueueUrl(nameHandler).then(queueUrl => {
      if (queueUrl == null) throw new Error(`${messages.SQS.MESSAGE_ERROR_FIND_QUEUE} : ${nameHandler} `);

      const params = {
        QueueUrl: queueUrl,
        ReceiptHandle: receiptHandle,
      };
      return this.SQS.deleteMessagePromise(params);
    });
  }

  async processMessages(nameHandler, handler, message) {
    return handler(message.Body)
      .then(result => {
        const promises = [];
        promises.push(this.deleteMessage(nameHandler, message.ReceiptHandle));
        return Promise.all(message).then(() => result);
      })
      .catch(error => {});
  }

  async poll(nameHandler, handler, options = {}) {
    return this.receiveMessages(nameHandler, options).then(message => {
      if (message) {
        Attivlogger.info(`${messages.SQS.MESSAGE_PROCESS}: ${nameHandler}`);
        return this.processMessages(nameHandler, handler, message).then(result => {
          if (result === false) {
            return null;
          }
          return this.poll(nameHandler, handler, options);
        });
      }
      return this.poll(nameHandler, handler, options);
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
