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
const message_1 = require("../../crosscutting/messages/message");
class DbContext {
    constructor({ db }) {
        this.countTransaction = 0;
        this.transaction = null;
        this.db = db.sequelize;
    }
    getTransaction() {
        return this.transaction;
    }
    beginTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            this.countTransaction++;
            if (this.transaction == null) {
                this.transaction = yield this.db.transaction({ autocommit: false });
            }
        });
    }
    commit() {
        if (!this.transaction)
            throw new Error(message_1.default.DbContexto.NOT_TRANSACTION);
        if (this.countTransaction == 1) {
            this.transaction.commit();
            this.transaction = null;
        }
        this.countTransaction--;
    }
    rollback() {
        if (!this.transaction)
            throw new Error(message_1.default.DbContexto.NOT_TRANSACTION);
        if (this.countTransaction == 1) {
            this.transaction.rollback();
            this.transaction = null;
        }
        this.countTransaction--;
    }
}
exports.default = DbContext;
