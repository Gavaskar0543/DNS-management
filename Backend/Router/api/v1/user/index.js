const express = require('express');
const router = express.Router();
const user = require('../../../../Controller/Api/V1/UserApi');
/*create new user account router*/
router.post('/createaccount',user.createNewUser);
/*user singin router */
router.post('/createsession',user.createSession);
module.exports = router;