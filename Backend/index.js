const express = require('express');
const port = 8000;
const app = express();
require('dotenv').config();
//incoming body parser
app.use(express.urlencoded({extended:true}))
//database
const db = require('./Config/mongoose');
//jwt_strategy
const jwt_strategy = require('./Config/passport_jwt_strategy');


//routes
app.use('/',require('./Router'));
app.listen(port,(err)=>{
    if(err){
        console.log('Error in listening server',err.message);
        return;
    }
    console.log(`Server up and running in port:${port}`);
})