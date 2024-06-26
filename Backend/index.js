const express = require('express');
const port = 8000;
const app = express();
require('dotenv').config();
//incoming body parser
app.use(express.urlencoded({extended:true}))
app.use(express.json())
//database
const db = require('./Config/mongoose');
//passport
const passport = require('passport');
//jwt_strategy
const jwtStrategy = require('./Config/passport_jwt_strategy');
const cors = require('cors');


//intializing passport to authorize routes
app.use(passport.initialize());

//c-o-r-s
app.use(cors());
//routes
app.use('/',require('./Router'));
app.listen(port,(err)=>{
    if(err){
        console.log('Error in listening server',err.message);
        return;
    }
    console.log(`Server up and running in port:${port}`);
})