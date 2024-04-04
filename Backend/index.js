const express = require('express');
const port = 8000;
const app = express();
require('dotenv').config();


const db = require('./Config/mongoose');

app.listen(port,(err)=>{
    if(err){
        console.log('Error in listening server',err.message);
        return;
    }
    console.log(`Server up and running in port:${port}`);
})