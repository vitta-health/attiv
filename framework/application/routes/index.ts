const { Router } = require('express');
const bodyParser = require('body-parser');

module.exports = ({ containerMiddleware }) => {
  const router = Router();
  const apiRouter = Router();
  apiRouter.use(bodyParser.json()).use(containerMiddleware);
  router.use('/api', apiRouter);
  return router;
};
