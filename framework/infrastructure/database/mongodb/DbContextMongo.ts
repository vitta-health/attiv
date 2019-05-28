import * as mongoose from 'mongoose';
import { APIError } from '../../..';

export default class DbContextMongo {
  constructor() {
    this.connect();
  }

  connect() {
    try {
      mongoose.connect(process.env.MONGO_DB);
      return mongoose.connection;
    } catch (error) {
      throw new APIError(error);
    }
  }
}
