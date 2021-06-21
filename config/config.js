require('dotenv').config()
module.exports = {
  development: {
    database: 'analytics_development',
    dialect: 'postgres'
  },
  test: {
    database: 'analytics_test',
    dialect: 'postgres'
  },
  production: {
    database: 'analytics_production',
    dialect: 'postgres'
  }
}
