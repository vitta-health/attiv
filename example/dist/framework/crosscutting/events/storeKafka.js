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
const kafkajs_1 = require("kafkajs");
const logger_1 = require("../logging/logger");
const message_1 = require("../messages/message");
class StoreKafka {
    constructor(subscribes) {
        this.subscribes = [];
        this.consumers = {};
        this.subscribes = subscribes;
    }
    init() {
        const brokers = [...process.env.KAFKA_BROKERS_ENDPOINT.split(',')];
        this.kafka = new kafkajs_1.Kafka({
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
    send(nameHandler, metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`${message_1.default.KAFKA.MESSAGE_SEND}: ${nameHandler}`);
            const producer = this.kafka.producer();
            yield producer.connect();
            yield producer.send({
                topic: nameHandler,
                messages: [{ value: JSON.stringify(metadata) }],
            });
            yield producer.disconnect();
        });
    }
    /**
     * Criação de uma novo consumidor
     * @param handler Função que deve ser executada quando uma nova mensagem chegar no topico, caso essa função seja passada o desenvolvedor é responsavel
     * pelo que acontecer com a informação enviada
     * @param nameHandler Nome do grupo @ tópico que será criado
     */
    addListener(handler, nameHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            const [groupId, topic] = nameHandler.split('@');
            const consumer = this.kafka.consumer({ groupId });
            yield consumer.connect();
            yield consumer.subscribe({ topic });
            yield consumer.run({
                eachMessage: ({ topic, partition, message }) => __awaiter(this, void 0, void 0, function* () {
                    const messageBody = JSON.parse(message.value.toString());
                    handler(messageBody, topic, partition);
                }),
            });
            this.consumers[nameHandler] = consumer;
        });
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
    getMessagesQueue(nameHandler) {
        throw new Error(message_1.default.all.METHOD_NOT_IMPLEMENTED);
    }
    /**
     * Método responsável por se desinscrever de um tópico
     * @param nameHandler Nome da fila
     */
    unsubscribe(nameHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.consumers[nameHandler]) {
                throw new Error(`${message_1.default.errorHandler.NOT_FOUND}: ${nameHandler}`);
            }
            yield this.consumers[nameHandler].disconnect();
            delete this.consumers[nameHandler];
        });
    }
    /**
     * Metodo responsavel por enviar a mesma mensagem para todas as filas existentes
     */
    sendAll(metadata) {
        return Promise.all(this.getChannels().map(channelName => this.send(channelName, metadata)));
    }
}
exports.default = StoreKafka;
