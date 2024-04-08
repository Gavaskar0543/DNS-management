const Domain  = require('../../../Model/DomainModel');

module.exports.getDomainsByIds = async (req,res) => {
    try {
      // Use the findByIds method to find domains by IDs
      const domains = await Domain.find({userId :req.body.id} );
      return res.status(200).json(
       { success:true,
        data:domains}
      )
    } catch (error) {
      return res.status(500).json({
        message:error.message,
        success:false
      })
    }
  };

  module.exports.deleteById =async (id) => {
    try {
      // Use the findByIds method to find domains by IDs
      const domains = await Domain.find({_id :id} );
      return true;

    } catch (error) {
     return false
    }
  };