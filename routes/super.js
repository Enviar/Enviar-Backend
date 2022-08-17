const express = require('express')
const superRouter = express.Router()

const superController = require('../controllers/superController')

superRouter.get('/getEmployee', superController.getEmployee)
superRouter.get('/getEmployeeId/:id', superController.getEmployeeById)
superRouter.put('/editEmployee/:id', superController.updateEmployee)
superRouter.delete('/deleteEmployee/:id', superController.deleteEmployee)
module.exports = superRouter