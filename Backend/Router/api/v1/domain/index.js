const express = require('express');
const router = express.Router();
const passport = require('passport');
const domainController = require('../../../../Controller/Api/V1/awsRouter53Api');
/* create Hosted Zones */
router.post('/createHostedZone',passport.authenticate('jwt', {session: false}),domainController.createHostedZone);
/**listedZones */
router.get('/getRecords',domainController.getRecords);
/**delete hostedzone */
router.delete('/deleteHostedZone',domainController.deleteHostedZone);

module.exports = router;