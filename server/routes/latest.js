const express = require('express');
const router = express.Router();



const { getLatestItems } = require('../controllers/latest.controller')
const { getLatestUsers } = require('../controllers/latest.controller');
const { checkAuthentication } = require('../middlewares/authentication');
const { checkRole } = require('../middlewares/role');


router.get('/users', checkAuthentication, checkRole, getLatestUsers)
router.get('/items', checkAuthentication, checkRole, getLatestItems)



module.exports = router;