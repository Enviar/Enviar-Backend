const express = require('express')
const productRouter = express.Router()
const productController = require('../controllers/productController')

productRouter.post('/product', productController.createProduct)
productRouter.get('/product/:receipt', productController.findByReceipt) //pakenya di status

module.exports = productRouter