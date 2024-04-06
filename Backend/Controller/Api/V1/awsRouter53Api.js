const awsConfig = require('../../../Config/aws_config');
const AWS = require('aws-sdk');

// Initialize AWS Route 53
const route53 = new AWS.Route53();

// API endpoint for creating a hosted zone
module.exports.hostedzone = async (req, res) => {
  try {
    const { domainName } = req.body;
    const params = {
      Name: domainName,
      CallerReference: `${Date.now()}` // Unique reference for each request
    };
    const data = await route53.createHostedZone(params).promise();
    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating hosted zone:', error);
    res.status(500).json({ error: 'Failed to create hosted zone' });
  }
};

// API endpoint for listing hosted zones
module.exports.listHostedZones =  async (req, res) => {
  try {
    const data = await route53.listHostedZones().promise();
    res.json(data.HostedZones);
  } catch (error) {
    console.error('Error listing hosted zones:', error);
    res.status(500).json({ error: 'Failed to list hosted zones' });
  }
};

// API endpoint for creating a DNS record
module.exports.dnsRecords = async (req, res) => {
  try {
    const { hostedZoneId, type, name, value, ttl } = req.body;
    const params = {
      HostedZoneId: hostedZoneId,
      ChangeBatch: {
        Changes: [
          {
            Action: 'CREATE',
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
    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating DNS record:', error);
    res.status(500).json({ error: 'Failed to create DNS record' });
  }
};

