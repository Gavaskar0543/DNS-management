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
    hostedZoneId:{
        type:String,
        required:true
    },
    domainInfo:{
        type:Object,
    }
},{
    timestamps:true
})

const Domain = mongoose.model('Domain',domainSchema);

module.exports = Domain;