const User = require('../../../Model/UserModel');

/**API #Creating New User Account**/
module.exports.createNewUser  =async function(req,res){
    try{
    
        let user = await User.findOne({email:req.body.email});
        if(user){
           /* This code snippet is handling the scenario where a user with the same email already
           exists in the system. */
            return res.status(409).json({
                message:'Conflit:Already exists in the system',
                success:false
            });
        }

       /* The code snippet `await User.create(req.body);` is creating a new user in the system using
       the data provided in the request body. */
        await User.create(req.body);
        return res.status(201).json({
            message:" Created: The request has been fulfilled, and a new user has been created",
            success:true
        })

    }catch(error){
        res.status(500).json({
            message:error.message,
            success:false
        })
    }
}