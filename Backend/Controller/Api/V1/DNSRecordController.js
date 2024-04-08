const AWS = require('aws-sdk');


AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1' 
})


// Initialize AWS Route 53
const route53 = new AWS.Route53({apiVersion: '2016-11-28'});

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
    const { hostedZoneId } = req.query;
    const { name, ttl, value, type } = req.body;
  
    const params = {
      HostedZoneId: hostedZoneId,
      ChangeBatch: {
        Changes: [
          {
            Action: 'UPSERT',
            ResourceRecordSet: {
              Name: name,
              Type: type,
              TTL: ttl,
              ResourceRecords: [
                { Value: value }
              ]
            }
          }
        ]
      }
    };
  
    const data = await route53.changeResourceRecordSets(params).promise();
    res.status(200).json({ message: 'DNS record updated successfully',data });
  } catch (error) {
    console.error('Error updating DNS record:', error);
    res.status(500).json({ error: 'Failed to update DNS record' ,message:error.message});
  }
};
