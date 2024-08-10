const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const randomCardsRoutes = require('./api/randomCardsController');

router.use('/', homeRoutes);
router.use('/random-cards', randomCardsRoutes);
router.use('/api', apiRoutes);

module.exports = router;
