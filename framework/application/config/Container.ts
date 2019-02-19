import Application from '../application';
import serverListen from '../server';
import DbContext from '../../infrastructure/database/DbContext'

const { asClass, asValue, createContainer, asFunction } = require('awilix');
const { scopePerRequest } = require('awilix-express');

const routerApp = require('../routes/index');

const container = createContainer();

container
  .register({
    app: asClass(Application).singleton(),
    server: asClass(serverListen).singleton(),
  })
  .register({
    router: asFunction(routerApp).singleton(),
    DbContext : asClass(DbContext).scoped()
  });

container.register({
  containerMiddleware: asValue(scopePerRequest(container)),
});

export default container;
