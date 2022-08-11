const { Product, Status, sequelize } = require('../models')

class productController {

    static async createProduct(req, res, next) {

        const t = await sequelize.transaction()
        try {
            const { senderName, senderPhone, recipientName, recipientPhone, recipientAddress, recipientCity, weightProduct, typeProduct } = req.body
            const response = await Product.create({
                senderName, senderPhone, recipientName, recipientPhone, recipientAddress, recipientCity, weightProduct, typeProduct, shipmentPrice: 5000 * recipientCity, receiptNumber: Math.floor((Math.random() * 9999) + 1)
            }, { transaction: t })

            const responseStatus = await Status.create(
                { EmployeeId: +req.additionalData.id, ProductId: response.id, CityId: +req.additionalData.cityId, notes: `disiapkan` },
                { transaction: t }
            )
            await t.commit()
            res.status(201).json({
                statusCOde: 201,
                message: `Product is created`
            })
        }
        catch (err) {
            await t.rollback()
            next(err)
        }
    }


    static async findByReceipt(req, res, next) {
        try {
            const receipt = req.params.receipt
            // console.log(receipt);
            const response = await Product.findOne({
                where: {
                    receiptNumber: receipt
                },

            })
            if (!response) {
                throw new Error(`NOT_FOUND`)
            }
            res.status(200).json({
                statusCode: 200,
                data: response
            })
        }
        catch (err) {
            next(err)
        }
    }

}

module.exports = productController