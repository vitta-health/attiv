import { NextFunction } from 'connect';
import DbContext from '../../infrastructure/database/DbContext'
import messages from '../../crosscutting/messages/message'

export function validateDbContext(req: any, res, next: NextFunction) {

    const json_ = res.json;
    const DbContext = req.container.resolve('DbContext') as DbContext;
        
    res.json =  function(data) {
        if(DbContext.getTransaction() != null)
        {
           DbContext.rollback();
           throw new Error(messages.validateDbContext.EXIST_TRANSACTION_OPEN);
        }
        json_.call(res, data);
      };

    next();
}