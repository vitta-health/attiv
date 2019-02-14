"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = require("./errorHandler");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
class Server {
    constructor({ router }) {
        this.express = express();
        this.express.disable('x-powered-by');
        this.express.use(router);
        this.express.use(cors);
        this.express.use(bodyParser);
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(errorHandler_1.ErrorHandler);
    }
    start() {
        return new Promise(resolve => {
            const http = this.express.listen(process.env.API_PORT || 3000, () => {
                const { port } = http.address();
                console.info(`processo [${process.pid}] executando na porta ${port}`);
                resolve();
            });
        });
    }
}
exports.default = Server;
