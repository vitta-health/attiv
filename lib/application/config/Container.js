"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const application_1 = require("../application");
const server_1 = require("../server");
const DbContext_1 = require("../../infrastructure/database/DbContext");
const { asClass, asValue, createContainer, asFunction } = require('awilix');
const { scopePerRequest } = require('awilix-express');
const routerApp = require('../routes/index');
const container = createContainer();
container
    .register({
    app: asClass(application_1.default).singleton(),
    server: asClass(server_1.default).singleton(),
})
    .register({
    router: asFunction(routerApp).singleton(),
    DbContext: asClass(DbContext_1.default).scoped()
});
container.register({
    containerMiddleware: asValue(scopePerRequest(container)),
});
exports.default = container;
