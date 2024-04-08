
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