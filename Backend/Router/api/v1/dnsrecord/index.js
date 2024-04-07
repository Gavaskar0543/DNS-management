const express = require('express');
const router = express.Router();
const dnsController = require('../../../../Controller/Api/V1/awsRouter53Api');
router.put('/updateDNSRecords',dnsController.updateDNSRecords);
module.exports = router;