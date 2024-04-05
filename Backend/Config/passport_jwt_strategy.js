const passport = require('passport');
const  JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const User = require('../Model/UserModel');


let opts = {
    jwtFromRequest:ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey:"myCode"
}

passport.use(opts,function(jwtpayload,done){
    User.findById(jwtpayload._id,function(err,user){
        if(err){
            return console.log(err.message);
        }
        if(user){
            return done(null,user);
        }
        return done(null,false);
    })
})

module.exports = passport;