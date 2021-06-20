const { Advertisement } = require('../models')

const getAllAds = async (req, res) => {
  try {
    const ads = await Advertisement.findAll({
      attributes: ['clicks', 'impressions', 'platform', 'product', 'date']
    })
    res.send(ads)
  } catch (error) {
    throw error
  }
}

module.exports = {
  getAllAds
}
