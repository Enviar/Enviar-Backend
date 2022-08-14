const express = require('express')
const statusRouter = express.Router()
const statusController = require('../controllers/statusController')

statusRouter.get('/status', statusController.getProduct) //for courier needs
statusRouter.get('/listStoreStatus', statusController.statusHere) //for list in store
statusRouter.post('/status', statusController.createStatus) //kebutuhan add status
statusRouter.post('/acceptance', statusController.statusAcceptance)
statusRouter.get('/status/:id', statusController.getStatusById) //ambil satuan status
statusRouter.get('/statusReceipt/:receipt', statusController.getStatus) //cek resi, buat user nih


module.exports = statusRouter