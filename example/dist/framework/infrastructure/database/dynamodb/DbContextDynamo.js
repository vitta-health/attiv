"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../../..");
const Aws = require("aws-sdk");
const message_1 = require("../../../crosscutting/messages/message");
class DbContextDynamo {
    constructor() {
        __1.Attivlogger.info(` ${message_1.default.DbContextDynamob.CONNECTING}`);
        this.connect('true');
    }
    connect(innitialize) {
        if (innitialize === 'true') {
            try {
                const connection = new Aws.DynamoDB({
                    accessKeyId: process.env.ACCESS_KEY_ID_DYNAMO,
                    secretAccessKey: process.env.SECRET_ACCESS_KEY_DYNAMO,
                    region: process.env.REGION_DYNAMO
                });
                return connection;
            }
            catch (error) {
                throw new __1.APIError(error);
            }
        }
    }
}
exports.default = DbContextDynamo;
