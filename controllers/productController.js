const { Product, Status, sequelize } = require('../models')

class productController {

    static async createProduct(req, res, next) {

        const t = await sequelize.transaction()
        try {
            const { senderName, senderPhone, recipientName, recipientPhone, recipientAddress, recipientCity, weightProduct, typeProduct, typeService } = req.body
            console.log(req.body);
            let output = 0
            let flag = false
            const origin = req.additionalData.cityId
            let receipt = ""
            do {

                receipt = `E` + origin + recipientCity + (Math.floor(Math.random() * 99999) + 1)
                output = Math.abs(recipientCity - origin) * 1000
                if (output < 10000) {
                    output = 10000
                } else if (output > 18000) {
                    output = 18000
                }
                output = output * weightProduct
                if (typeService == "extra") {
                    output += 7000
                }
                const findReceipt = await Product.findOne({
                    where: {
                        receiptNumber: receipt
                    }
                })
                // console.log(findReceipt);
                if (!findReceipt) {
                    flag = true
                }
            } while (flag == false)

            if (flag == true) {

                const response = await Product.create({
                    senderName, senderPhone, recipientName, recipientPhone, recipientAddress, recipientCity, weightProduct, typeProduct, typeService: typeService, shipmentPrice: output, receiptNumber: receipt,
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