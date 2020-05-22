"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../logging/logger");
const message_1 = require("../messages/message");
const emitter = require('events').EventEmitter;
class StoreBase {
    constructor(subscribes) {
        this.subscribes = [];
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
    send(nameHandler, metadata) {
        logger_1.default.info(`${message_1.default.BASE_QUEUES.MESSAGE_SEND}: ${nameHandler}`);
        this.emitterEvent.emit(nameHandler, metadata);
    }
    /**
     * Criação de uma nova fila
     * @param queueName Nome da fila que será criada
     * @param callback Função que deve ser executada quando uma nova mensagem chegar na fila, caso essa função seja passada o desenvolvedor é responsavel
     * pelo que acontecer com a informação enviada
     */
    addListener(handler, nameHandler) {
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
    getMessagesQueue(nameHandler) {
        return this.emitterEvent.listeners(nameHandler);
    }
    unsubscribe(nameHandler) {
        this.emitterEvent.removeListener(nameHandler, () => { });
    }
    /**
     * Metodo responsavel por enviar a mesma mensagem para todas as filas existentes
     */
    sendAll(metadata) {
        this.getChannels().forEach(channelName => {
            this.emitterEvent.emit(channelName, metadata);
        });
    }
}
exports.default = StoreBase;
