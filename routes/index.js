const express = require('express')
const router = express.Router()
const locationRouter = require('./location')
const employeeRouter = require('./employee')
const productRouter = require('./product')
const statusRouter = require('./status')
const authenctication = require('../middleware/authentication')

router.use('/', employeeRouter)
router.use(authenctication)
router.use('/', locationRouter)
router.use('/', productRouter)
router.use('/', statusRouter)

module.exports = router