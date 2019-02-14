"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ResponseRequest_1 = require("../../../crosscutting/util/ResponseRequest");
class GenericController {
    constructor(service) {
        this._service = service;
    }
    getRouter() {
        const router = express_1.Router();
        router.get('/', this.index.bind(this));
        router.post('/', this.create.bind(this));
        router.put('/:id', this.update.bind(this));
        router.delete('/:id', this.delete.bind(this));
        return router;
    }
    index(req, res, nextn) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resRequest = new ResponseRequest_1.default();
                resRequest.data = yield this._service.getAll();
                return res.status(200).json(resRequest);
            }
            catch (ex) {
                nextn(ex);
            }
        });
    }
    create(req, res, nextn) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this._service.create(req.body);
                return res.status(200).json(data);
            }
            catch (ex) {
                nextn(ex);
            }
        });
    }
    update(req, res, nextn) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this._service.update(req.params.id, req.body);
                return res.status(200).json(data);
            }
            catch (ex) {
                nextn(ex);
            }
        });
    }
    delete(req, res, nextn) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this._service.delete(req.params.id);
                return res.status(200).json(data);
            }
            catch (ex) {
                nextn(ex);
            }
        });
    }
}
exports.default = GenericController;
