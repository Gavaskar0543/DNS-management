const AWS = require('aws-sdk');
const Domain = require('../../../Model/DomainModel');
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1' 
})


// Initialize AWS Route 53
const route53 = new AWS.Route53({apiVersion: '2016-11-28'});


// API endpoint for creating a hosted zone and storing domain info in MongoDB
module.exports.createHostedZone = async (req, res) => {
  try {
    const { userId, name } = req.body; // Assuming you pass the user ID and domain name in the request body

    // Create hosted zone in AWS Route 53
    const params = {
      Name: name,
      CallerReference: `${Date.now()}` // Unique reference for each request
    };
    const data = await route53.createHostedZone(params).promise();
    const hostedZoneId = data.HostedZone.Id.split('/').pop(); // Extract hosted zone ID

    // Store domain info in MongoDB
    const domain = new Domain({
      userId: userId,
      domainName: name,
      hostedZoneId: hostedZoneId,
      domainInfo:data
    });
    await domain.save();

    res.status(201).json({ message: 'Hosted zone created and domain info stored' ,
  data:data});
  } catch (error) {
    console.error('Error creating hosted zone:', error);
    res.status(500).json({ error: 'Failed to create hosted zone and store domain info' });
  }
};



// API endpoint for listing hosted zones
module.exports.getRecords = async (req, res) => {
  const { zoneId } = req.query;

  const params = { HostedZoneId: zoneId };

  try {
    const data = await route53.listResourceRecordSets(params).promise();
    res.json(data.ResourceRecordSets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting records",Error:error.message });
  }
};



// API endpoint for updating DNS records in a hosted zone
module.exports.updateDNSRecords = async (req, res) => {
  try {
    const { hostedZoneId } = req.params; // Assuming you pass the hosted zone ID as a URL parameter
    const { recordName, recordType, newValue, newTTL } = req.body; // Assuming you pass the record name, type, and updated details in the request body

    // Construct parameters for updating DNS record
    const params = {
      HostedZoneId: hostedZoneId,
      ChangeBatch: {
        Changes: [
          {
            Action: 'UPSERT', // Specify UPSERT to update or insert the record
            ResourceRecordSet: {
              Name: recordName,
              Type: recordType,
              TTL: newTTL,
              ResourceRecords: [
                { Value: newValue }
              ]
            }
          }
        ]
      }
    };

    const data = await route53.changeResourceRecordSets(params).promise();
    res.status(200).json({ message: 'DNS record updated successfully' });
  } catch (error) {
    console.error('Error updating DNS record:', error);
    res.status(500).json({ error: 'Failed to update DNS record' });
  }
};



module.exports.deleteHostedZone = async (req, res) => {
  try {
    const { hostedZoneId } = req.query; // Assuming you pass the hosted zone ID as a URL parameter
    const params = {
      Id: hostedZoneId // The ID of the hosted zone to be deleted
    };
    const data = await route53.deleteHostedZone(params).promise();
    res.status(200).json({ message: 'Hosted zone deleted successfully' });
  } catch (error) {
    console.error('Error deleting hosted zone:', error);
    res.status(500).json({ error: 'Failed to delete hosted zone',
  message:error.message });
  }
};