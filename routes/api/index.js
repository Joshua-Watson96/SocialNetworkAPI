// require express router
const router = require('express').Router();

// require userRoutes and thoughtRoutes
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// router use userRoutes and thoughtRoutes
router.use('/users', userRoutes);

router.use('/thoughts', thoughtRoutes);

// export router
module.exports  = router;