import { ErrorHandler } from './middlewares/errorHandler';
import { responseHandler } from './middlewares/responseHandler';
import { NotFoundError } from '../crosscutting/exceptions/NotFoundError';
import { NextFunction } from 'express';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

class Server {
  express: any;
  constructor({ router , containerMiddleware}) {
    this.express = express();
    this.express.disable('x-powered-by');
    this.express.use(containerMiddleware);
    this.express.use(responseHandler);

    this.express.use(router);
    this.express.use(cors);
    this.express.use(bodyParser);
    this.express.use(bodyParser.urlencoded({ extended: false }));
    // catch 404 and forward to error handler
    router.use('*', (req: Request, res: Response, next: NextFunction) => {
      throw new NotFoundError();
    });

    this.express.use(ErrorHandler);
  }

  start() {
    return new Promise(resolve => {
      const http = this.express.listen(process.env.API_PORT || 3000, () => {
        const { port } = http.address();
        console.info(`processo [${process.pid}] executando na porta ${port}`);
        resolve();
      });
    });
  }
}

export default Server;
