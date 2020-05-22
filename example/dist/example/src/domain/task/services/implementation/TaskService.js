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
const Task_1 = require("../../entities/Task");
class TaskService extends attiv_1.GenericImpl {
    constructor({ taskRepository }) {
        super(taskRepository, Task_1.default);
        this.taskRepository = taskRepository;
    }
    getFindTaskByTitle(name) {
        return this.taskRepository.getFindTaskByTitle(name);
    }
    createIsValid(item) {
        const task = new Task_1.default();
        task.title = item.title;
        task.description = item.description;
        task.email = item.email;
        if (task.isValid()) {
            return { message: 'Objeto valido!' };
        }
    }
    create(item) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = new Task_1.default(item);
            yield this.genericRepository.beginTransaction();
            try {
                const resp = yield this.genericRepository.create(task);
                yield this.genericRepository.commit();
                return resp;
            }
            catch (ex) {
                console.error(ex);
                yield this.genericRepository.rollback();
            }
        });
    }
}
exports.default = TaskService;
