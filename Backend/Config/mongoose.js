const mongoose = require('mongoose');
main().catch(err => console.log(err.message));
async function main(){
  await mongoose.connect(process.env.DB_URL);}
const db = mongoose.connection;
db.on('error',console.error.bind(console,'Error in Connecting Database'));
db.once('open',()=>{
    console.log('Server Successfully Config with Database');
})

module.exports = db;