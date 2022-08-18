const { Op } = require("sequelize");
const { Status, Product, sequelize, City } = require('../models')

class statusController {

    static async createStatus(req, res, next) {
        const t = await sequelize.transaction()
        try {
            const { ProductId, CityId, notes, photo, name } = req.body
            console.log(req.body);
            if (photo) {
                console.log(`a`);
                const response = await Status.create(
                    { EmployeeId: +req.additionalData.id, ProductId, CityId, notes: photo },
                    { transaction: t }
                )
                const response2 = await Status.create({
                    EmployeeId: +req.additionalData.id, ProductId, CityId, notes: name
                }, { transaction: t })
                const response3 = await Status.create({
                    EmployeeId: +req.additionalData.id, ProductId, CityId, notes
                }, { transaction: t })
                await t.commit()
                res.status(201).json({
                    statusCode: 201,
                    message: `Status is created`,
                })
            } else {
                console.log(`b`);
                const response2 = await Status.create({
                    EmployeeId: +req.additionalData.id, ProductId, CityId, notes
                }, { transaction: t })
                await t.commit()
                res.status(201).json({
                    statusCode: 201,
                    message: `Status is created`,
                    data: response2
                })
            }
        }
        catch (err) {
            await t.rollback()
            next(err)
        }
    }

    static async statusAcceptance(req, res, next) {
        try {
            let arrayProduct = []
            const receiptNumber = req.body.receiptNumber
            // console.log(receiptNumber);
            for (const info in receiptNumber) {
                // console.log(receiptNumber[info].receipt);
                const ResponseData = await Product.findOne({
                    where: {
                        receiptNumber: receiptNumber[info].receipt
                    }
                })
                if (!ResponseData) {
                    throw new Error(`NOT_FOUND`)
                }
                arrayProduct.push(ResponseData)
            }
            // console.log(arrayProduct[1].id);
            let fixedData = arrayProduct.map((el, i) => {
                return {
                    // EmployeeId: +req.additionalData.id, ProductId, CityId, notes
                    EmployeeId: +req.additionalData.id,
                    ProductId: el.id,
                    CityId: +req.additionalData.cityId,
                    notes: `transit_diterima`
                }
            })
            // console.log(fixedData);
            const result = await Status.bulkCreate(fixedData);
            console.log(result);
            res.status(201).json(result)
            //7983
        }
        catch (err) {
            next(err)
        }
    }

    static async getProduct(req, res, next) { //for courier
        try {
            let listProductId = []
            let listToSend = []
            let dataToSend = []
            let totalNum = 0
            const response = await Status.findAll({
                where: {
                    CityId: +req.additionalData.cityId,
                    notes: `siap_dikirim`
                },
                include: [Product],
            })
            // console.log(response);
            response.forEach(x => {
                listProductId.push(x.ProductId)
            })
            for (const list of listProductId) {
                try {
                    const statusx = await Status.findAll({
                        where: {
                            ProductId: list
                        }
                    })
                    let arrayStatus = []
                    statusx.forEach(el => {
                        arrayStatus.push(el.notes)
                    })
                    // console.log(arrayStatus);
                    // if (arrayStatus[arrayStatus.length - 1] != `selesai`) {
                    //     listToSend.push(list)
                    // }
                    if (arrayStatus.includes('selesai')) {

                    } else {
                        listToSend.push(list)
                    }
                    arrayStatus = []

                } catch (err) {
                    next(err)
                }
            }
            // console.log(listToSend, `listToSend`);
            for (let fixSend of listToSend) {
                try {
                    const fixData = await Status.findAll({
                        where: {
                            ProductId: fixSend,
                            notes: `sedang dikirim`
                        },
                        include: [Product]
                    })
                    if (fixData.length) {

                        dataToSend.push(fixData)
                    }
                } catch (err) {
                    next(err)
                }
            }
            for (let fixSend of listToSend) {
                try {
                    console.log(dataToSend.length, `data to send`);
                    if (dataToSend.length > 0) {
                        if (dataToSend[0][0].ProductId != fixSend) {
                            // console.log(dataToSend[0][0].ProductId, fixSend, `[erbandingan]`);
                            const fixData = await Status.findAll({
                                where: {
                                    ProductId: fixSend,
                                    notes: `siap_dikirim`
                                },
                                include: [Product]
                            })

                            dataToSend.push(fixData)
                        } else {

                        }
                    } else {
                        const fixData2 = await Status.findAll({
                            where: {
                                ProductId: fixSend,
                                notes: `siap_dikirim`
                            },
                            include: [Product]
                        })
                        dataToSend.push(fixData2)
                    }
                } catch (err) {
                    next(err)
                }
            }

            // console.log(dataToSend);

            // console.log(listProductId);
            res.status(200).json(dataToSend)
        }
        catch (err) {
            next(err)
        }
    }



    static async statusHere(req, res, next) { //for store list admin
        try {
            let listProductId = []
            let listToSend = []
            let dataToSend = []
            let dataTransit = []
            let listTransit = []
            let totalNum = 0
            const response = await Status.findAll({
                where: {
                    CityId: +req.additionalData.cityId,
                    notes: `disiapkan`
                },
                include: [Product],
            })
            const transit_tiba = await Status.findAll({
                where: {
                    CityId: +req.additionalData.cityId,
                    notes: `transit_diterima`
                },
                include: [Product]
            })
            response.forEach(x => {
                listProductId.push(x.ProductId)
            })
            transit_tiba.forEach(el => {
                dataTransit.push(el.ProductId)
            })
            // console.log(dataTransit, `transit`);
            for (const list of listProductId) {
                try {
                    const statusx = await Status.findAll({
                        where: {
                            ProductId: list
                        }
                    })
                    let arrayStatus = []
                    statusx.forEach(el => {
                        arrayStatus.push(el.notes)
                    })
                    console.log(arrayStatus, list, `disiapkan infop`);
                    // if (arrayStatus[arrayStatus.length - 1] == `disiapkan`) {
                    //     listToSend.push(list)
                    // }
                    // console.log(listToSend);
                    if (arrayStatus.includes('siap_dikirim') || arrayStatus.includes('transit_dikirim')) {
                        // console.log(`siap_dikim`, list);
                    }
                    else if (arrayStatus[arrayStatus.length - 1] == `transit_diterima`) {
                        listToSend.push(list)
                    }
                    else {
                        listToSend.push(list)
                    }
                    arrayStatus = []

                } catch (err) {
                    next(err)
                }
            }
            console.log(dataTransit, `dataTransit`);
            for (const list of dataTransit) {
                try {
                    const statusx = await Status.findAll({
                        where: {
                            ProductId: list
                        }
                    })
                    let arrayStatus = []
                    statusx.forEach(el => {
                        arrayStatus.push(el.notes)
                    })

                    console.log(arrayStatus, `arrayStatys`, list);
                    if (arrayStatus.includes(`transit_diterima`)) {
                        if (arrayStatus.includes('siap_dikirim')) {
                            console.log(`cya`, list);
                        } else {
                            console.log(`aya`, list);
                            listTransit.push(list)

                        }
                    }
                    else if (arrayStatus.includes('siap_dikirim') || arrayStatus.includes('transit_dikirim')) {
                        // console.log(`blok`);
                        // console.log(`siap_dikim`, list);
                    }
                    else {
                        console.log(`as`);
                        listTransit.push(list)
                    }

                    // console.log(listToSend);
                    arrayStatus = []

                } catch (err) {
                    next(err)
                }
            }
            // console.log(listToSend, `listToSend`);
            // for (let fixSend of listToSend) {
            //     try {
            //         const fixData = await Status.findAll({
            //             where: {
            //                 ProductId: fixSend,
            //                 notes: `transit_diterima`
            //             },
            //             include: [Product]
            //         })
            //         if (fixData.length) {

            //             dataToSend.push(fixData)
            //         }
            //     } catch (err) {
            //         next(err)
            //     }
            // }
            console.log(listTransit, `listTransit`);
            console.log(listToSend, `listtosend`);
            for (let fixSend of listToSend) {
                try {
                    console.log(dataToSend.length, `data to send`);

                    if (dataToSend.length > 0) {
                        if (dataToSend[0][0].ProductId != fixSend) {
                            // console.log(dataToSend[0][0].ProductId, fixSend, `[erbandingan]`);
                            const fixData = await Status.findAll({
                                where: {
                                    ProductId: fixSend,
                                    notes: `disiapkan`
                                },
                                include: [Product]
                            })

                            dataToSend.push(fixData)
                        } else {

                        }
                    } else {
                        const fixData2 = await Status.findAll({
                            where: {
                                ProductId: fixSend,
                                notes: `disiapkan`
                            },
                            include: [Product]
                        })
                        dataToSend.push(fixData2)
                    }
                } catch (err) {
                    next(err)
                }
            }

            for (let fixSend of listTransit) {
                try {
                    console.log(dataToSend, `data to send`);

                    if (dataToSend.length > 0) {
                        if (dataToSend[0][0].ProductId != fixSend) {
                            // console.log(dataToSend[0][0].ProductId, fixSend, `[erbandingan]`);
                            const fixData = await Status.findAll({
                                where: {
                                    ProductId: fixSend,
                                    notes: `transit_diterima`
                                },
                                include: [Product]
                            })

                            dataToSend.push(fixData)
                        } else {

                        }
                    } else {

                        const fixData2 = await Status.findAll({
                            where: {
                                ProductId: fixSend,
                                notes: `transit_diterima`
                            },
                            include: [Product]
                        })
                        if (fixData2.length > 1) {
                            dataToSend.push(fixData2)
                        }
                        else if (fixData2.length < 1) {
                            const fixData3 = await Status.findAll({
                                where: {
                                    ProductId: fixSend,
                                    notes: `transit_diterima`
                                },
                                include: [Product]
                            })
                            dataToSend.push(fixData3)
                        }
                    }
                } catch (err) {
                    next(err)
                }
            }


            // console.log(listProductId);

            res.status(200).json(dataToSend)
        }
        catch (err) {
            next(err)
        }
    }
    // static async getStatus(req, res, next) { //by receipt
    //     try {
    //         const receipt = req.params.receipt
    //         // console.log(receipt, `receipt`);
    //         const response = await Status.findAll({
    //             include: [Product],

    //         })
    //         const fixData = response.filter(el => el.Product.receiptNumber == receipt)
    //         res.status(200).json(fixData)
    //     }
    //     catch (err) {
    //         next(err)
    //     }
    // }

    static async getStatus(req, res, next) {
        try {
            const receipt = req.params.receipt
            const response = await Product.findOne({
                where: {
                    receiptNumber: receipt
                }
            })
            if (!response) {
                throw new Error(`NOT_FOUND`)
            }
            const statusOf = await Status.findAll({
                where: {
                    ProductId: response.id
                },
                order: [
                    ['id', 'ASC']
                ],
                include: [Product, City]
            })
            const destination = await City.findByPk(+response.recipientCity)

            // console.log(destination);
            res.status(200).json({
                statusCode: 200,
                data: statusOf,
                destinationCity: destination.name,

            })
        }
        catch (err) {
            next(err)
        }
    }


    static async getStatusById(req, res, next) {
        try {
            const id = +req.params.id
            const response = await Status.findByPk(+id, {
                include: [Product, City]
            })
            const destination = await City.findByPk(+response.Product.recipientCity)
            // console.log(destination);
            res.status(200).json({
                statusCode: 201,
                data: response,
                destination: destination
            })
        }
        catch (err) {
            next(err)
        }
    }
}

module.exports = statusController