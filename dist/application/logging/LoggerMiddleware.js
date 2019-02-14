"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerStreamAdapter_1 = require("../../crosscutting/logging/LoggerStreamAdapter");
const morgan = require('morgan');
module.exports = ({ logger }) => {
    return morgan('dev', {
        stream: LoggerStreamAdapter_1.default.toStream(logger),
    });
};
