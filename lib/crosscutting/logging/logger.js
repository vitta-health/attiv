"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston = require("winston");
const level = process.env.LOG_LEVEL || "debug";
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: level,
            timestamp: function () {
                return new Date().toISOString();
            },
        }),
    ],
    exitOnError: false,
});
exports.default = logger;
