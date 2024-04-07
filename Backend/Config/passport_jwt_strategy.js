const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../Model/UserModel');


let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY
}


passport.use(new JWTStrategy(opts, async function(jwtPayLoad, done){

   let user = await User.findById(jwtPayLoad._id);
   if(!user){
    return done(null,false);
   }       
   return done(null,user);

}));

module.exports = passport;