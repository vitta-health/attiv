import { NextFunction } from 'connect';
import { ResponseRequest } from '../..';

import logger from "../../crosscutting/logging/logger";
import messages from '../../crosscutting/messages/message';
import DbContext from '../../infrastructure/database/DbContext';


export function responseHandler(req: any, res, next: NextFunction) {
  const json_ = res.json;
  let DbContext;

  try {
    DbContext = req.container.resolve('DbContext') as DbContext;
  } catch (err) {
    logger.info('This project doens\'t contains a DbContext class')
  }

  res.json = function (data) {
    if (data === null) {
      data = {};
    }

    if (DbContext && DbContext.getTransaction() != null) {
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
