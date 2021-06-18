'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Advertisement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Advertisement.init(
    {
      product: DataTypes.STRING,
      date: DataTypes.STRING,
      platform: DataTypes.STRING,
      impressions: DataTypes.INTEGER,
      clicks: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Advertisement',
      tableName: 'advertisement'
    }
  )
  return Advertisement
}
