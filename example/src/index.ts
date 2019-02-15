import { container, Application } from 'vitta-api';
const { asClass } = require('awilix');
import TaskController from './application/controllers/TaskController';
import TaskService from './domain/task/services/implementation/TaskService';
import TaskRepository from './repository/task/TaskRepository';
import bodyParser = require('body-parser');

container.register({
  taskController: asClass(TaskController),
  taskService: asClass(TaskService),
  taskRepository: asClass(TaskRepository),
});

const vittaRouter = container.resolve('router');
vittaRouter.use(bodyParser.json());
vittaRouter.use('/task', container.resolve('taskController').getRouter());

const app = container.resolve('app') as Application;

app.start().catch(error => {
  console.log(error);
  process.exit();
});
