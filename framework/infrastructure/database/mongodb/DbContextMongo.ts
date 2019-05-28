import * as mongoose from 'mongoose';
import { APIError } from '../../..';

export default class DbContextMongo {
  constructor() {
    this.connect();
  }

  connect() {
    try {
      const CONNECTION_STRING = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${
        process.env.MONGO_HOST
      }:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;

      mongoose.connect(CONNECTION_STRING);
      return mongoose.connection;
    } catch (error) {
      throw new APIError(error);
    }
  }
}
