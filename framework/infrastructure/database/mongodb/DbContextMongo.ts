import * as mongoose from 'mongoose';
import { APIError, Attivlogger } from '../../..';
import messages from '../../../crosscutting/messages/message';

export default class DbContextMongo {
  constructor({ config }) {
    Attivlogger.info(` ${messages.DbContextoMongo.CONNECTING}: ${config.MONGO_USING} `);
    this.connect(config.MONGO_USING);
  }

  connect(initialize) {
    if (initialize === 'true') {
      try {
        const mongoPoolSize = process.env.MONGO_POOL_SIZE ? process.env.MONGO_POOL_SIZE : '10';

        const CONNECTION_STRING = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}?authSource=${process.env.MONGO_AUTH_DB}&poolSize=${mongoPoolSize}`;

        mongoose.connect(CONNECTION_STRING);

        return mongoose.connection;
      } catch (error) {
        throw new APIError(error);
      }
    } else {
      throw new APIError(messages.DbContextoMongo.DISABLED_CONNECTION);
    }
  }
}
