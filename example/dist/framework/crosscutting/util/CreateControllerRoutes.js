"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Container_1 = require("../../application/config/Container");
function createControllerRoutes(controllerUri) {
    const Controller = Container_1.default.resolve(controllerUri);
    return Controller.getRouter();
}
exports.default = createControllerRoutes;
