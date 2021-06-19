const { Advertisement } = require('../models')

const getAllAds = async (req, res) => {
  try {
    const ads = await Advertisement.findAll()
    res.send(ads)
  } catch (error) {
    throw error
  }
}

module.exports = {
  getAllAds
}
