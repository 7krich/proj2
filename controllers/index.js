// collect packaged group of API endpoints & prefix them wtih api path
const router = require('express').Router();
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
const apiRoutes = require('./api');
const { append } = require('express/lib/response');

router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);

router.use('*',(req, res) => {
  res.status(404).end();
});

module.exports = router;
