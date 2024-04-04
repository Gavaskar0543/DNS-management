const mongoose = require('mongoose');
const DNSRecordSchema = new mongoose.Schema({
    domainId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Domain',
        required:true
    },
    type:{
        type:String
    },
    name:{
        type:String
    },
    value:{
        type:String
    },
    ttl:{
        type:Number
    }
},{
    timestamps:true
});

const DNSRecord = mongoose.model('DNSRecord',DNSRecordSchema);

module.exports = DNSRecord;