'use strict';

const Router = require('express').Router;
const rootRouter = require('./root');

const apiRouter = Router();
apiRouter.all('*', (req, res) => res.status(404).send('Not Found'));

const router = Router();
router.use('/api', apiRouter);
router.use(rootRouter);

module.exports = router;
