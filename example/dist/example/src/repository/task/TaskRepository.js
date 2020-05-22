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
const models_1 = require("../database/models");
class TaskRepository extends attiv_1.BaseRepositoryMysql {
    constructor({ DbContext, db, paginateParams, eventServiceProviderExample }) {
        super(models_1.Task, DbContext, paginateParams);
        this._db = db;
        this.event = eventServiceProviderExample;
    }
    getFindTaskByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryBuilder = {
                where: {
                    title: {
                        $like: '%' + title + '%',
                    },
                },
                include: [
                    {
                        as: 'sub_tasks',
                        model: this._db.SubTasks,
                    },
                ],
            };
            const meta = new attiv_1.Metadata();
            meta.data = queryBuilder;
            meta.uniqueId = Math.random();
            this.event.send('destiny-AppListenersEventListener', meta);
            return this.paginate(queryBuilder);
        });
    }
}
exports.default = TaskRepository;
