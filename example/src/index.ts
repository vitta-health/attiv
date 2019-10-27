import 'module-alias/register';
import { container, Application } from 'attiv';
const { asClass, asValue } = require('awilix');
import TaskController from './application/controllers/TaskController';
import TaskService from './domain/task/services/implementation/TaskService';
import TaskRepository from './repository/task/TaskRepository';
import bodyParser = require('body-parser');
import EventServiceProviderExample from './EventServiceProviderExample';
import ExerciseRepository from './repositoryMongo/exercise/ExerciseRepository';
import ExerciseService from './domain/excercise/services/implementation/ExerciseService';
import ExerciseController from './application/controllers/ExerciseController';

const db = require('./repository/database/models/index.js');

container.register({
  config: asValue(process.env),
  eventServiceProviderExample: asValue(new EventServiceProviderExample()),
  taskController: asClass(TaskController).scoped(),
  taskService: asClass(TaskService).scoped(),
  taskRepository: asClass(TaskRepository).scoped(),

  exerciseRepository: asClass(ExerciseRepository).scoped(),
  exerciseService: asClass(ExerciseService).scoped(),
  exerciseController: asClass(ExerciseController).scoped(),
  db: asValue(db),
});

const vittaRouter = container.resolve('router');

vittaRouter.use(bodyParser.json());
vittaRouter.use('/task', container.resolve('taskController').getRouter());
vittaRouter.use('/exercise', container.resolve('exerciseController').getRouter());

const app = container.resolve('app') as Application;

app.start().catch(error => {
  console.log(error);
  process.exit();
});
