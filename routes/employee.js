const express = require('express')
const employeeRouter = express.Router()
const employeeController = require('../controllers/employeeController')
const statusController = require('../controllers/statusController')

employeeRouter.get('/getCity', employeeController.getCity)
employeeRouter.post('/register', employeeController.RegisterEmployee) //register admin
employeeRouter.post('/login', employeeController.LoginEmployee) // login admin
employeeRouter.post('/checkPrice', employeeController.checkPrice) // cek harga user
employeeRouter.get('/statusReceipt/:receipt', statusController.getStatus) //cek resi user
module.exports = employeeRouter

