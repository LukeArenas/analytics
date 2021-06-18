const data = require('../data/data.json')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const ads = data.map((ad) => ({
      product: ad.product,
      date: ad.date,
      platform: ad.platform,
      impressions: ad.impressions,
      clicks: ad.clicks,
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    await queryInterface.bulkInsert('advertisements', ads)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('advertisements')
  }
}
