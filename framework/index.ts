import container from './application/config/Container';
import Application from './application/application';

import GenericController from './application/controllers/generic/GenericController';
import IGenericController from './application/controllers/generic/IGenericController';

const router = require('./application/routes/index');

import Attivlogger from './crosscutting/logging/logger';

import { APIError } from './crosscutting/exceptions/APIError';
import { BusinessError } from './crosscutting/exceptions/BusinessError';
import { NotFoundError } from './crosscutting/exceptions/NotFoundError';
import { ObjectNotFoundError } from './crosscutting/exceptions/ObjectNotFoundError';
import { RepositoryError } from './crosscutting/exceptions/RepositoryError';
import { UnauthenticatedError } from './crosscutting/exceptions/UnauthenticatedError';
import { ValidationError } from './crosscutting/exceptions/ValidationError';
import { PaginateHandler } from './application/middlewares/paginateHandler';

import messages from './crosscutting/messages/message';

import CreateControllerRoutes from './crosscutting/util/CreateControllerRoutes';
import ResponseRequest from './crosscutting/util/ResponseRequest';
const SchemaValidationJoi = require('./crosscutting/util/SchemaValidationJoi');

import GenericImpl from './domain/generics/GenericImpl';
import IGeneric from './domain/generics/IGeneric';
import BaseEntity from './domain/generics/BaseEntity';

import IRepositoryGeneric from './infrastructure/database/IRepositoryGeneric';
import BaseRepositoryMysql from './infrastructure/database/mysql/BaseRepositoryMysql';
import BaseRepositoryMongo from './infrastructure/database/mongodb/BaseRepositoryMongo';
import Server from './application/server';
import storeBase from './crosscutting/events/storeBase';
import Metadata from './crosscutting/events/integration/metadata';
import EventAttiv from './crosscutting/events/integration/eventAttiv';
import StoreRabbitMQ from './crosscutting/events/storeRabbitMQ';
import Orchestration from './crosscutting/events/orchestration';
import StoreType from './crosscutting/events/storeTypes';
import DbContextMongo from './infrastructure/database/mongodb/DbContextMongo';

export {
  container,
  Application,
  Server,
  router,
  PaginateHandler,
  GenericController,
  IGenericController,
  APIError,
  BusinessError,
  NotFoundError,
  ObjectNotFoundError,
  RepositoryError,
  UnauthenticatedError,
  ValidationError,
  Attivlogger,
  messages,
  CreateControllerRoutes,
  ResponseRequest,
  SchemaValidationJoi,
  IGeneric,
  GenericImpl,
  IRepositoryGeneric,
  BaseRepositoryMysql,
  BaseRepositoryMongo,
  BaseEntity,
  storeBase,
  Metadata,
  EventAttiv,
  StoreRabbitMQ,
  Orchestration,
  StoreType,
  DbContextMongo,
};
