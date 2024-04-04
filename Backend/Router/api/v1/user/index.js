const express = require('express');
const router = express.Router();
const user = require('../../../../Controller/Api/V1/UserController');
/*create new user account router*/
router.get('/whoami',(req,res)=>{
    res.send("MR.k.Gavaskar");
})
router.post('/createaccount',user.createNewUser);
module.exports = router;