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
      console.log(data);
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




// Delete DNS records of a specific type by domain name and record type
module.exports.deltednsRecord = async (req, res) => {
    const { domainName, recordType , hostedZoneId,ttl,resourceValue} = req.query;
   

    try {
      
        const params = {
            HostedZoneId: hostedZoneId,
            ChangeBatch: {
                Changes: [
                    {
                        Action: 'DELETE',
                        ResourceRecordSet: {
                        Name: domainName,
                            Type: recordType,
                            TTL: ttl,
                            ResourceRecords: [
                                { Value: resourceValue }
                            ]
                          }
                    }
                ]
            }
        };

        // Make the API call to delete the DNS records
        const data = await route53.changeResourceRecordSets(params).promise();
        res.status(200).json({ message: `DNS records of type ${recordType} deleted successfully`, data });
    } catch (error) {
        console.error(`Error deleting DNS records of type ${recordType}:`, error);
        res.status(500).json({ error: `Failed to delete DNS records of type ${recordType}`, message: error.message });
    }
  }


 
  

  module.exports.updateExistingDNSRecords = async (req, res) => {
    try {
   
    const {hostedZoneId,type,name,TTL,resourceValue} = req.body;
    console.log(req.body)

    
      const params = {
        HostedZoneId: hostedZoneId,
        ChangeBatch: {
          Changes: [
            {
              Action: 'UPSERT',
              ResourceRecordSet: {
                Name: name,
                Type: type,
                TTL: TTL,
                ResourceRecords: [
                  { Value: resourceValue }
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