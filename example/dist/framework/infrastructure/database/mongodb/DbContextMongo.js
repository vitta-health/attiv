"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const __1 = require("../../..");
const message_1 = require("../../../crosscutting/messages/message");
class DbContextMongo {
    constructor({ config }) {
        __1.Attivlogger.info(` ${message_1.default.DbContextoMongo.CONNECTING}: ${config.MONGO_USING} `);
        this.connect(config.MONGO_USING);
    }
    connect(initialize) {
        if (initialize === 'true') {
            try {
                const mongoPoolSize = process.env.MONGO_POOL_SIZE ? process.env.MONGO_POOL_SIZE : '10';
                const CONNECTION_STRING = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=${process.env.MONGO_AUTH_DB}&poolSize=${mongoPoolSize}`;
                mongoose.connect(CONNECTION_STRING);
                return mongoose.connection;
            }
            catch (error) {
                throw new __1.APIError(error);
            }
        }
        else {
            throw new __1.APIError(message_1.default.DbContextoMongo.DISABLED_CONNECTION);
        }
    }
}
exports.default = DbContextMongo;
