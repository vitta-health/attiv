"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attiv_1 = require("attiv");
class EventServiceProviderAudditLogger extends attiv_1.Orchestration {
    constructor(storeType) {
        super(storeType);
        this.init();
    }
}
exports.default = EventServiceProviderAudditLogger;
