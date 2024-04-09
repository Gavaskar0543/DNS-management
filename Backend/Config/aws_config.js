const awsconfig = require('aws-sdk');

awsconfig.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: 'us-east-1' 
})

module.exports = awsconfig;