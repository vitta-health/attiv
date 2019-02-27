import { NextFunction } from 'connect';
import DbContext from '../../infrastructure/database/DbContext';
import messages from '../../crosscutting/messages/message';
import { ResponseRequest } from '../..';

export function responseHandler(req: any, res, next: NextFunction) {
  const json_ = res.json;
  const DbContext = req.container.resolve('DbContext') as DbContext;

  res.json = function(data) {
    if (DbContext.getTransaction() != null) {
      DbContext.rollback();
      throw new Error(messages.responseHandler.EXIST_TRANSACTION_OPEN);
    }

    if (res.statusCode == 200) {
      const resRequest = new ResponseRequest();
      resRequest.data = data;

      json_.call(res, resRequest);
    } else {
      json_.call(res, data);
    }
  };

  next();
}
