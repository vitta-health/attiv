"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../logging/logger");
const message_1 = require("../messages/message");
const AWS = require("aws-sdk");
const bluebird = require("bluebird");
class StoreSQS {
    constructor(subscribes) {
        this.subscribes = [];
        this.UrlChaves = [];
        this.WaitTimeSeconds = 20;
        this.subscribes = subscribes;
    }
    init(serverless = false) {
        if (serverless) {
            AWS.config.credentials = new AWS.Credentials(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY, null);
        }
        AWS.config.update({ region: process.env.AWS_REGION });
        this.SQS = new AWS.SQS({ apiVersion: '2012-11-05' });
        bluebird.promisifyAll(this.SQS, { suffix: 'Promise' });
        this.subscribes.forEach(subscribe => {
            this.addListener(subscribe.listener, subscribe.name);
        });
    }
    send(nameHandler, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let queueUrl = yield this.getQueueUrl(nameHandler);
                if (!queueUrl) {
                    yield this.createQueue(nameHandler);
                    queueUrl = yield this.getQueueUrl(nameHandler);
                }
                let params;
                if (this.isFifoQueue(nameHandler)) {
                    const messageDeduplicationId = String(Math.random());
                    params = {
                        MessageBody: JSON.stringify(metadata),
                        QueueUrl: queueUrl,
                        MessageGroupId: '1',
                        MessageDeduplicationId: messageDeduplicationId,
                    };
                }
                else {
                    params = {
                        MessageBody: JSON.stringify(metadata),
                        QueueUrl: queueUrl,
                    };
                }
                logger_1.default.info(`${message_1.default.SQS.MESSAGE_SEND}: ${nameHandler}`);
                return this.SQS.sendMessagePromise(params);
            }
            catch (ex) {
                logger_1.default.error(`${message_1.default.SQS.MESSAGE_ERROR_SEND}: ${nameHandler}`);
                throw ex;
            }
        });
    }
    getQueueUrl(nameHandler) {
        if (!this.SQS)
            throw new Error(`${message_1.default.SQS.MESSAGE_ERROR_INIT}`);
        if (!nameHandler) {
            return null;
        }
        else if (!this.UrlChaves[nameHandler]) {
            const params = {
                QueueName: nameHandler,
            };
            return this.SQS.getQueueUrlPromise(params)
                .then(data => {
                this.UrlChaves[nameHandler] = data.QueueUrl;
                return this.UrlChaves[nameHandler];
            })
                .catch(error => {
                logger_1.default.error(`${message_1.default.SQS.MESSAGE_ERROR_GETURL}: ${nameHandler}`);
                return null;
            });
        }
        return Promise.resolve(this.UrlChaves[nameHandler]);
    }
    createQueue(nameHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let queueUrl = yield this.getQueueUrl(nameHandler);
                if (queueUrl) {
                    return Promise.resolve(queueUrl);
                }
                let attributes;
                if (this.isFifoQueue(nameHandler)) {
                    attributes = {
                        ReceiveMessageWaitTimeSeconds: this.WaitTimeSeconds.toString(),
                        FifoQueue: 'true',
                        VisibilityTimeout: '43200',
                    };
                }
                else {
                    attributes = {
                        ReceiveMessageWaitTimeSeconds: this.WaitTimeSeconds.toString(),
                        VisibilityTimeout: '43200',
                    };
                }
                const params = {
                    QueueName: nameHandler,
                    Attributes: attributes,
                };
                queueUrl = this.SQS.createQueuePromise(params);
                logger_1.default.info(`${message_1.default.SQS.MESSAGE_CREATE_QUEUE}: ${nameHandler}`);
                return queueUrl;
            }
            catch (ex) {
                logger_1.default.error(`${message_1.default.SQS.MESSAGE_ERROR_CREATE_QUEUE}: ${nameHandler}`);
                throw ex;
            }
        });
    }
    isFifoQueue(nameHandler) {
        const splitNameHandler = nameHandler.split('.');
        return splitNameHandler[splitNameHandler.length - 1] === 'fifo';
    }
    addListener(handler, nameHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            let queueUrl;
            queueUrl = yield this.getQueueUrl(nameHandler);
            if (!queueUrl) {
                queueUrl = yield this.createQueue(nameHandler);
            }
            this.poll(nameHandler, handler);
            logger_1.default.info(`${message_1.default.SQS.MESSAGE_LISTENER_QUEUE}: ${nameHandler}`);
        });
    }
    receiveMessages(nameHandler, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getQueueUrl(nameHandler).then(queueUrl => {
                if (queueUrl == null)
                    throw new Error(`${message_1.default.SQS.MESSAGE_ERROR_FIND_QUEUE} '${nameHandler}'`);
                const params = {
                    QueueUrl: queueUrl,
                    WaitTimeSeconds: this.WaitTimeSeconds,
                };
                return this.SQS.receiveMessagePromise(params).then(({ Messages: messages }) => {
                    if (!messages)
                        return null;
                    let deserialized = { ReceiptHandle: '', Body: '' };
                    if (messages.length > 0) {
                        messages.forEach(message => {
                            try {
                                deserialized.ReceiptHandle = message.ReceiptHandle;
                                deserialized.Body = JSON.parse(message.Body);
                            }
                            catch (error) {
                                deserialized = null;
                                logger_1.default.info(`${messages.SQS.MESSAGE_JSON_INVALID}: ${nameHandler}`);
                            }
                        });
                    }
                    else {
                        deserialized = null;
                    }
                    return deserialized;
                });
            });
        });
    }
    deleteMessage(nameHandler, receiptHandle) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getQueueUrl(nameHandler).then(queueUrl => {
                if (queueUrl === null)
                    throw new Error(`${message_1.default.SQS.MESSAGE_ERROR_FIND_QUEUE} : ${nameHandler} `);
                const params = {
                    QueueUrl: queueUrl,
                    ReceiptHandle: receiptHandle,
                };
                return this.SQS.deleteMessagePromise(params);
            });
        });
    }
    processMessages(nameHandler, handler, message) {
        return __awaiter(this, void 0, void 0, function* () {
            return handler(message.Body)
                .then(result => {
                this.deleteMessage(nameHandler, message.ReceiptHandle);
                return Promise.all(message).then(() => result);
            })
                .catch(error => { });
        });
    }
    poll(nameHandler, handler, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.receiveMessages(nameHandler, options).then(message => {
                if (message) {
                    logger_1.default.info(`${message_1.default.SQS.MESSAGE_PROCESS}: ${nameHandler}`);
                    return this.processMessages(nameHandler, handler, message).then(result => {
                        if (result === false) {
                            return null;
                        }
                        return this.poll(nameHandler, handler, options);
                    });
                }
                return this.poll(nameHandler, handler, options);
            });
        });
    }
    getChannels() {
        return this.subscribes;
    }
    getMessagesQueue(nameHandler) {
        throw new Error(message_1.default.all.METHOD_NOT_IMPLEMENTED);
    }
    unsubscribe(nameHandler) {
        throw new Error(message_1.default.all.METHOD_NOT_IMPLEMENTED);
    }
    sendAll(metadata) {
        throw new Error(message_1.default.all.METHOD_NOT_IMPLEMENTED);
    }
}
exports.default = StoreSQS;
