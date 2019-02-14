"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerStreamAdapter = {
    toStream(logger) {
        return {
            write(message) {
                logger.info(message.slice(0, -1));
            }
        };
    }
};
exports.default = LoggerStreamAdapter;
