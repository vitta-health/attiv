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
        const CONNECTION_STRING = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${
          process.env.MONGO_HOST
        }:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;

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
