"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = require("./middlewares/errorHandler");
const responseHandler_1 = require("./middlewares/responseHandler");
const NotFoundError_1 = require("../crosscutting/exceptions/NotFoundError");
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
class Server {
    constructor({ router, containerMiddleware }) {
        this.express = express();
        this.express.disable("x-powered-by");
        this.express.use(morgan("combined"));
        this.express.use(containerMiddleware);
        this.express.use(responseHandler_1.responseHandler);
        this.express.use(router);
        this.express.use(cors);
        this.express.use(bodyParser);
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use("/docs", express.static("docs"));
        // catch 404 and forward to error handler
        router.use("*", (req, res, next) => {
            throw new NotFoundError_1.NotFoundError();
        });
        this.express.use(errorHandler_1.ErrorHandler);
    }
    getExpress() {
        return express;
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
