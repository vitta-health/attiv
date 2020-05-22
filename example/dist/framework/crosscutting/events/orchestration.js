"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const storeBase_1 = require("./storeBase");
const storeRabbitMQ_1 = require("./storeRabbitMQ");
const storeTypes_1 = require("./storeTypes");
const storeSqs_1 = require("./storeSqs");
const storeKafka_1 = require("./storeKafka");
let Orchestration = /** @class */ (() => {
    class Orchestration {
        constructor(orchestrador) {
            switch (orchestrador) {
                case storeTypes_1.default.RABBITMQ:
                    this.orchestrationConfigInstance = new storeRabbitMQ_1.default(Orchestration.subscribes);
                    break;
                case storeTypes_1.default.SQS:
                    this.orchestrationConfigInstance = new storeSqs_1.default(Orchestration.subscribes);
                    break;
                case storeTypes_1.default.KAFKA:
                    this.orchestrationConfigInstance = new storeKafka_1.default(Orchestration.subscribes);
                    break;
                default:
                    this.orchestrationConfigInstance = new storeBase_1.default(Orchestration.subscribes);
            }
        }
        static setSubscribes(subscribes) {
            this.subscribes.push(subscribes);
        }
        getInstance() {
            return this.orchestrationConfigInstance;
        }
        init() {
            return this.orchestrationConfigInstance.init();
        }
        send(nameHandler, metadata) {
            return this.orchestrationConfigInstance.send(nameHandler, metadata);
        }
        addListener(handler, nameHandler) {
            return this.orchestrationConfigInstance.addListener(handler, nameHandler);
        }
        getChannels() {
            return this.orchestrationConfigInstance.getChannels();
        }
        getMessagesQueue(nameHandler) {
            return this.orchestrationConfigInstance.getMessagesQueue(nameHandler);
        }
        unsubscribe(nameHandler) {
            return this.orchestrationConfigInstance.unsubscribe(nameHandler);
        }
        sendAll(metadata) {
            return this.orchestrationConfigInstance.sendAll(metadata);
        }
    }
    Orchestration.subscribes = [];
    return Orchestration;
})();
exports.default = Orchestration;
