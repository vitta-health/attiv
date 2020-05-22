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
const attiv_1 = require("attiv");
class EventServiceProviderExample extends attiv_1.Orchestration {
    constructor() {
        super(attiv_1.StoreType.BASE);
        attiv_1.Orchestration.setSubscribes(new attiv_1.EventAttiv(this.AppListenersEventListener.bind(this), 'destiny-AppListenersEventListener'));
        attiv_1.Orchestration.setSubscribes(new attiv_1.EventAttiv(this.Teste.bind(this), 'destiny-Teste'));
        this.init();
    }
    AppListenersEventListener(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`AppListenersEventListener MENSAGEM RECEBIDA NA FILA E TRATADA ${JSON.stringify(data)}`);
        });
    }
    Teste(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(`Teste MENSAGEM RECEBIDA NA FILA E TRATADA ${JSON.stringify(data)}`);
        });
    }
}
exports.default = EventServiceProviderExample;
