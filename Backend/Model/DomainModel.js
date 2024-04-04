const mongoose = require('mongoose');
const domainSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    domainName:{
        type:String,
        required:true,
        unique:true
    },
    record:{
        type:[Object],
        required:true
    }
},{
    timestamps:true
})

const Domain = mongoose.model('Domain',domainSchema);

module.exports = Domain;