import { NextFunction } from 'connect';
import DbContext from '../../infrastructure/database/DbContext';
import messages from '../../crosscutting/messages/message';
import { ResponseRequest } from '../..';

export function responseHandler(req: any, res, next: NextFunction) {
  const json_ = res.json;
  const DbContext = req.container.resolve('DbContext') as DbContext;

  res.json = function(data) {
    if (data === null) {
      data = {};
    }

    if (DbContext.getTransaction() != null) {
      DbContext.rollback();
      throw new Error(messages.responseHandler.EXIST_TRANSACTION_OPEN);
    }

    if (res.statusCode == 200) {
      const resRequest = new ResponseRequest();

      if (data.paginate !== undefined && data.paginate === true) {
        resRequest.page = data.page;
        resRequest.pageSize = data.pageSize;
        resRequest.pages = data.pages;
        resRequest.total = data.total;
        resRequest.data = data.data;
      } else {
        resRequest.data = data;
      }

      json_.call(res, resRequest);
    } else {
      json_.call(res, data);
    }
  };

  next();
}
