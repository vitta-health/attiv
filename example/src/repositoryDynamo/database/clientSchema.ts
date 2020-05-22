import * as dynamo from 'dynamodb';
import * as Joi from 'joi';

const clientSchema = dynamo.define('client', {
  hashKey: 'uuid',
  timestamps: true,
  schema: {
    uuid: dynamo.types.uuid(),
    name: Joi.string(),
    cpf: Joi.string(),
    age: Joi.number(),
  },
  tableName: 'client'
});

export default clientSchema;
