import 'module-alias/register';
import { container, Application } from 'attiv';
const { asClass, asValue } = require('awilix');
import TaskController from './application/controllers/TaskController';
import TaskService from './domain/task/services/implementation/TaskService';
import TaskRepository from './repository/task/TaskRepository';
import MedicineController from './application/controllers/MedicineController';
import MedicineService from './domain/medicine/services/implementation/MedicineService';
import MedicineRepository from './repository/medicine/MedicineRepository';
import LaboratoryController from './application/controllers/LaboratoryController';
import LaboratoryService from './domain/laboratory/services/implementation/LaboratoryService';
import LaboratoryRepository from './repository/laboratory/LaboratoryRepository';
import MedicineLaboratoryRepository from './repository/medicine/MedicineLaboratoryRepository';
import bodyParser = require('body-parser');
import EventServiceProviderExample from './EventServiceProviderExample';
import ExerciseRepository from './repositoryMongo/exercise/ExerciseRepository';
import ExerciseService from './domain/excercise/services/implementation/ExerciseService';
import ExerciseController from './application/controllers/ExerciseController';
import ClientRepository from './repositoryDynamo/client/ClientRepository';
import ClientService from './domain/client/services/implementation/ClientService';
import ClientController from './application/controllers/ClientController';

const db = require('./repository/database/models/index.js');

container.register({
  config: asValue(process.env),
  eventServiceProviderExample: asValue(new EventServiceProviderExample()),
  taskController: asClass(TaskController).scoped(),
  taskService: asClass(TaskService).scoped(),
  taskRepository: asClass(TaskRepository).scoped(),

  medicineController: asClass(MedicineController).scoped(),
  medicineService: asClass(MedicineService).scoped(),
  medicineRepository: asClass(MedicineRepository).scoped(),

  laboratoryController: asClass(LaboratoryController).scoped(),
  laboratoryService: asClass(LaboratoryService).scoped(),
  laboratoryRepository: asClass(LaboratoryRepository).scoped(),

  medicineLaboratoryRepository: asClass(MedicineLaboratoryRepository).scoped(),

  exerciseRepository: asClass(ExerciseRepository).scoped(),
  exerciseService: asClass(ExerciseService).scoped(),
  exerciseController: asClass(ExerciseController).scoped(),

  clientRepository: asClass(ClientRepository).scoped(),
  clientService: asClass(ClientService).scoped(),
  clientController: asClass(ClientController).scoped(),
  db: asValue(db),
});

const vittaRouter = container.resolve('router');

vittaRouter.use(bodyParser.json());
vittaRouter.use('/task', container.resolve('taskController').getRouter());
vittaRouter.use('/medicine', container.resolve('medicineController').getRouter());
vittaRouter.use('/laboratory', container.resolve('laboratoryController').getRouter());
vittaRouter.use('/exercise', container.resolve('exerciseController').getRouter());
vittaRouter.use('/client', container.resolve('clientController').getRouter());

const app = container.resolve('app') as Application;

app.start().catch(error => {
  console.log(error);
  process.exit();
});
