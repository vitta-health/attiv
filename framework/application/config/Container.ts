import Application from '../application';
import serverListen from '../server';
import DbContext from '../../infrastructure/database/DbContext';
import DbContextMongo from '../../infrastructure/database/mongodb/DbContextMongo';
import DbContextDynamo from '../../infrastructure/database/dynamodb/DbContextDynamo';

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
    DbContext: asClass(DbContext).scoped(),
    DbContextMongo: asClass(DbContextMongo).singleton(),
    DbContextDynamo: asClass(DbContextDynamo).singleton()
  });

container.register({
  containerMiddleware: asValue(scopePerRequest(container)),
});

export default container;
