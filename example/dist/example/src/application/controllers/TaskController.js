"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const attiv_1 = require("attiv");
const express_1 = require("express");
class TaskController extends attiv_1.GenericController {
    constructor() {
        super('taskService');
    }
    getRouter() {
        let router = express_1.Router();
        router = super.getRouter();
        router.get('/get', this.getAll.bind(this));
        router.get('/find/name', this.getFindTaskByTitle.bind(this));
        router.post('/new', this.createIsValid.bind(this));
        return router;
    }
    getFindTaskByTitle(req, res, nextn) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(200).json(yield this.getService(req).getFindTaskByTitle(req.query.title));
            }
            catch (ex) {
                nextn(ex);
            }
        });
    }
    getAll(req, res, nextn) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(200).json(yield this.getService(req).getAll());
            }
            catch (ex) {
                nextn(ex);
            }
        });
    }
    createIsValid(req, res, nextn) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(200).json(yield this.getService(req).createIsValid(req.body));
            }
            catch (ex) {
                nextn(ex);
            }
        });
    }
}
exports.default = TaskController;
