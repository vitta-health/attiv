const { Router } = require('express');
const bodyParser = require('body-parser');
module.exports = ({ containerMiddleware }) => {
    const router = Router();
    const apiRouter = Router();
    apiRouter.use(bodyParser.json()).use(containerMiddleware);
    apiRouter.use('/test', (req, res) => {
        return res.send(200).json('Hello');
    });
    router.use('/api', apiRouter);
    return router;
};
