const express = require('express');
const router = express.Router();
router.use('/user',require('./user'));
router.use('/domain',require('./domain'));
router.use('/dns',require('./dnsrecord'));

module.exports = router;