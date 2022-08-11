const express = require('express')
const locationRouter = express.Router()
const locationController = require('../controllers/locationController')

locationRouter.post('/city', locationController.addCity)
locationRouter.post('/store', locationController.addStore)

module.exports = locationRouter