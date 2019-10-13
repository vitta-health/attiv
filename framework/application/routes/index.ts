import { PaginateHandler } from '../middlewares/paginateHandler';

const { Router } = require('express');
const bodyParser = require('body-parser');

module.exports = () => {
  const router = Router();

  router.use(PaginateHandler);
  router.use(bodyParser.json())

  router.use('/healthcheck', (req, res, next) => {

    return res
      .status(200)
      .json({ message: `Hello, I'm attiv and i'm here to help you develop software faster, robust and secure. The process is running for ${Math.floor(process.uptime()) / 60} minutes` });
  });

  return router;
};
