const express = require('express')
const employeeRouter = express.Router()
const employeeController = require('../controllers/employeeController')
const statusController = require('../controllers/statusController')
employeeRouter.post('/register', employeeController.RegisterEmployee)
employeeRouter.post('/login', employeeController.LoginEmployee)
employeeRouter.get('/statusReceipt/:receipt', statusController.getStatus) //cek 
module.exports = employeeRouter