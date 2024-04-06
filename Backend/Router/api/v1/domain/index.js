const express = require('express');
const router = express.Router();
const domainController = require('../../../../Controller/Api/V1/awsRouter53Api');
/*Hosted Zones */
router.post('/hostedZone',domainController.createHostedZone);
/**listedZones */
router.get('/getListedzone',domainController.getRecords);

module.exports = router;