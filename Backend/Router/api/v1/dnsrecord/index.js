const express = require('express');
const router = express.Router();
const dnsController = require('../../../../Controller/Api/V1/DNSRecordController');
router.get('/getRecords',dnsController.getRecords)
router.put('/updateDNSRecords',dnsController.updateDNSRecords);
module.exports = router;