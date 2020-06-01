import { APIError, Attivlogger } from '../../..';
import * as dynamo from 'dynamodb';
import * as AWS from 'aws-sdk';
import messages from '../../../crosscutting/messages/message';

export default class DbContextDynamo {

  constructor({ config }) {
    Attivlogger.info(`${messages.DbContextDynamob.CONNECTING}`);
    this.connect(config.DYNAMO_USING);
  }

  connect(innitiliaze) {
    if (innitiliaze === 'true') {
      try {
        dynamo.AWS.config.credentials = new AWS.Credentials(
          process.env.ACCESS_KEY_ID_DYNAMO,
          process.env.SECRET_ACCESS_KEY_DYNAMO,
          null,
        );
        AWS.config.update({ region: process.env.REGION_DYNAMO });
        return dynamo;
      } catch (error) {
        throw new APIError(error);
      }
    }
  }
}