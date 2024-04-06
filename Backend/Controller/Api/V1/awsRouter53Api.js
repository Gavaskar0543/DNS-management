const AWS = require('aws-sdk');
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-1' 
})


// Initialize AWS Route 53
const route53 = new AWS.Route53({apiVersion: '2016-11-28'});

// API endpoint for creating a hosted zone
module.exports.createHostedZone = async (req, res) => {
  const { zoneId, hostname, recordType, value } = req.body;

  const params = {
    ChangeBatch: {
      Changes: [
        {
          Action: "CREATE",
          ResourceRecordSet: {
            Name: hostname,
            Type: recordType,
            TTL: 300, // Set a TTL of 5 minutes
            ResourceRecords: [{ Value: value }],
          },
        },
      ],
    },
    HostedZoneId: zoneId,
  };

  try {
    await route53.changeResourceRecordSets(params).promise();
    res.json({ message: "Record created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating record" });
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




const updateRecord = async (req, res) => {
  const { recordId, value } = req.body;

  // Implement logic to retrieve record details using recordId

  const params = {
    ChangeBatch: {
      Changes: [
        {
          Action: "UPDATE",
          ResourceRecordSet: {
            Name: retrievedRecord.name, // Replace with retrieved record name
            Type: retrievedRecord.type, // Replace with retrieved record type
            TTL: 300,
            ResourceRecords: [{ Value: value }],
          },
        },
      ],
    },
    HostedZoneId: retrievedRecord.zoneId, // Replace with retrieved zoneId
  };

  try {
    await route53.changeResourceRecordSets(params).promise();
    res.json({ message: "Record updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating record" });
  }
};


const deleteRecord = async (req, res) => {
  const { recordId } = req.params;

  // Implement logic to retrieve record details using recordId

  const params = {
    ChangeBatch: {
      Changes: [
        {
          Action: "DELETE",
          ResourceRecordSet: {
            Name: retrievedRecord.name, // Replace with retrieved record name
            Type: retrievedRecord.type, // Replace with retrieved record type
            TTL: 300,
          },
        },
      ],
    },
    HostedZoneId: retrievedRecord.zoneId, // Replace with retrieved zoneId
  };

  try {
    await route53.changeResourceRecordSets(params).promise();
    res.json({ message: "Record deleted successfully" });
  } 
  catch (error){
    return res.status(500).json({
      message:error.message
    })
  }
}
