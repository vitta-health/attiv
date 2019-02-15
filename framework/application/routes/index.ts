const { Router } = require('express');
const bodyParser = require('body-parser');

module.exports = ({ containerMiddleware }) => {
  const router = Router();

  const apiRouter = Router();
  apiRouter.use(bodyParser.json()).use(containerMiddleware);

  apiRouter.use('/check', (req, res, next) => {
    return res.status(200).json({ message: 'Seja bem vindo, estou aqui para te ajudar !!! ' });
  });

  router.use('/api', apiRouter);

  return router;
};
