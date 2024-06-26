const express = require('express');
const router = express.Router();
const passport = require('passport');
const domainapi = require('../../../../Controller/Api/V1/awsRouter53Api');
const domainController = require('../../../../Controller/Api/V1/DomainController');
/**get all domains for matching userid */
router.post('/getdomainsbyid',domainController.getDomainsByIds);
/* create Hosted Zones */
router.post('/createHostedZone',domainapi.createHostedZone);

/**delete hostedzone */
router.delete('/deleteHostedZone',domainapi.deleteHostedZone);

module.exports = router;