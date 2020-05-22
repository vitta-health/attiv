"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const attiv_1 = require("attiv");
const { asClass, asValue } = require('awilix');
const TaskController_1 = require("./application/controllers/TaskController");
const TaskService_1 = require("./domain/task/services/implementation/TaskService");
const TaskRepository_1 = require("./repository/task/TaskRepository");
const MedicineController_1 = require("./application/controllers/MedicineController");
const MedicineService_1 = require("./domain/medicine/services/implementation/MedicineService");
const MedicineRepository_1 = require("./repository/medicine/MedicineRepository");
const LaboratoryController_1 = require("./application/controllers/LaboratoryController");
const LaboratoryService_1 = require("./domain/laboratory/services/implementation/LaboratoryService");
const LaboratoryRepository_1 = require("./repository/laboratory/LaboratoryRepository");
const MedicineLaboratoryRepository_1 = require("./repository/medicine/MedicineLaboratoryRepository");
const bodyParser = require("body-parser");
const EventServiceProviderExample_1 = require("./EventServiceProviderExample");
const ExerciseRepository_1 = require("./repositoryMongo/exercise/ExerciseRepository");
const ExerciseService_1 = require("./domain/excercise/services/implementation/ExerciseService");
const ExerciseController_1 = require("./application/controllers/ExerciseController");
const ClientRepository_1 = require("./repositoryDynamo/client/ClientRepository");
const ClientService_1 = require("./domain/client/services/implementation/ClientService");
const ClientController_1 = require("./application/controllers/ClientController");
const db = require('./repository/database/models/index.js');
attiv_1.container.register({
    config: asValue(process.env),
    eventServiceProviderExample: asValue(new EventServiceProviderExample_1.default()),
    taskController: asClass(TaskController_1.default).scoped(),
    taskService: asClass(TaskService_1.default).scoped(),
    taskRepository: asClass(TaskRepository_1.default).scoped(),
    medicineController: asClass(MedicineController_1.default).scoped(),
    medicineService: asClass(MedicineService_1.default).scoped(),
    medicineRepository: asClass(MedicineRepository_1.default).scoped(),
    laboratoryController: asClass(LaboratoryController_1.default).scoped(),
    laboratoryService: asClass(LaboratoryService_1.default).scoped(),
    laboratoryRepository: asClass(LaboratoryRepository_1.default).scoped(),
    medicineLaboratoryRepository: asClass(MedicineLaboratoryRepository_1.default).scoped(),
    exerciseRepository: asClass(ExerciseRepository_1.default).scoped(),
    exerciseService: asClass(ExerciseService_1.default).scoped(),
    exerciseController: asClass(ExerciseController_1.default).scoped(),
    clientRepository: asClass(ClientRepository_1.default).scoped(),
    clientService: asClass(ClientService_1.default).scoped(),
    clientController: asClass(ClientController_1.default).scoped(),
    db: asValue(db),
});
const vittaRouter = attiv_1.container.resolve('router');
vittaRouter.use(bodyParser.json());
vittaRouter.use('/task', attiv_1.container.resolve('taskController').getRouter());
vittaRouter.use('/medicine', attiv_1.container.resolve('medicineController').getRouter());
vittaRouter.use('/laboratory', attiv_1.container.resolve('laboratoryController').getRouter());
vittaRouter.use('/exercise', attiv_1.container.resolve('exerciseController').getRouter());
vittaRouter.use('/client', attiv_1.container.resolve('clientController').getRouter());
const app = attiv_1.container.resolve('app');
app.start().catch(error => {
    console.log(error);
    process.exit();
});
