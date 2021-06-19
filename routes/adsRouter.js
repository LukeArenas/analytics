const Router = require('express').Router()
const controller = require('../controllers/AdsController')

Router.get('/', controller.getAllAds)

module.exports = Router
