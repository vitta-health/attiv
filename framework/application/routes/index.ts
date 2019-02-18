const { Router } = require('express');
const bodyParser = require('body-parser');

module.exports = ({ containerMiddleware }) => {
  const router = Router();

  const apiRouter = Router();
  apiRouter.use(bodyParser.json()).use(containerMiddleware);

  apiRouter.use('/check', (req, res, next) => {
    return res
      .status(200)
      .json({ message: `Hello, I'm attiv and I'm here to help you develop software faster, robust and secure.` });
  });

  router.use('/api', apiRouter);

  return router;
};
