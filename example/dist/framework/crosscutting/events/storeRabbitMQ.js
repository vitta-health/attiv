"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amqp = require("amqplib/callback_api");
const logger_1 = require("../logging/logger");
const message_1 = require("../messages/message");
const util = require("util");
class StoreRabbitMQ {
    constructor(subscribes) {
        this.subscribes = [];
        this.subscribes = subscribes;
    }
    init() {
        amqp.connect(process.env.RABBITMQ_HOST, (err, conn) => {
            if (err) {
                throw new Error(message_1.default.RabbitMQ.CONNECTION_FAILED);
            }
            this.connetionRabbit = conn;
            this.subscribes.forEach(subscribe => {
                this.addListener(subscribe.listener, subscribe.name);
            });
        });
    }
    send(nameHandler, metadata) {
        this.connetionRabbit.createChannel((err, channel) => {
            if (err) {
                throw new Error(util.inspect(err));
            }
            const ex = nameHandler;
            const msg = JSON.stringify(metadata);
            channel.assertQueue(ex);
            channel.sendToQueue(ex, new Buffer(msg));
            logger_1.default.info(`${message_1.default.RabbitMQ.MESSAGE_SEND}: ${nameHandler}`);
        });
    }
    addListener(handler, nameHandler) {
        this.connetionRabbit.createChannel((err, channel) => {
            if (err) {
                throw new Error(util.inspect(err));
            }
            const ex = nameHandler;
            channel.assertQueue(ex, { durable: true });
            channel.consume(ex, data => {
                let metadata;
                if (data.content) {
                    metadata = JSON.parse(data.content.toString('utf8'));
                }
                else {
                    throw new Error(`${message_1.default.RabbitMQ.MESSAGE_CONTENT_JSON_ERRO}`);
                }
                handler(metadata).then(response => {
                    channel.ack(data);
                    logger_1.default.info(`${message_1.default.RabbitMQ.MESSAGE_SUCCESS}: ${nameHandler}`);
                }, error => {
                    logger_1.default.error(`${message_1.default.RabbitMQ.MESSAGE_ERROR}: ${nameHandler} | ${error}`);
                });
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
exports.default = StoreRabbitMQ;
