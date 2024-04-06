const express = require('express');
const router = express.Router();
const domainController = require('../../../../Controller/Api/V1/awsRouter53Api');
/* create Hosted Zones */
router.post('/hostedzone',domainController.createHostedZone);
/**listedZones */
router.get('/getListedzone',domainController.getRecords);
/**delete hostedzone */
router.delete('/destroyzone',domainController.deleteHostedZone);

module.exports = router;