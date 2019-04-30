import { container, Application } from 'attiv';
const { asClass, asValue } = require('awilix');
import TaskController from './application/controllers/TaskController';
import TaskService from './domain/task/services/implementation/TaskService';
import TaskRepository from './repository/task/TaskRepository';
import bodyParser = require('body-parser');
import EventServiceProviderExample from './EventServiceProviderExample';

const db = require('./repository/database/models/index.js');

container.register({
  config: asValue(process.env),
  eventServiceProviderExample: asValue(new EventServiceProviderExample()),
  taskController: asClass(TaskController).scoped(),
  taskService: asClass(TaskService).scoped(),
  taskRepository: asClass(TaskRepository).scoped(),
  db: asValue(db),
});

const vittaRouter = container.resolve('router');

vittaRouter.use(bodyParser.json());
vittaRouter.use('/task', container.resolve('taskController').getRouter());

const app = container.resolve('app') as Application;

app.start().catch(error => {
  console.log(error);
  process.exit();
});
