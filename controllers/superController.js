const { Employee, Store, City } = require('../models')

class superController {
    static async getEmployee(req, res, next) {
        try {
            const response = await Employee.findAll({
                where: {
                    StoreId: +req.additionalData.id
                }
            })
            // console.log(response);
            if (response.length < 1) {
                throw new Error("NOT_FOUND")
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

    static async getEmployeeById(req, res, next) {
        try {
            const id = +req.params.id
            const response = await Employee.findByPk(id)
            if (!response) {
                throw new Error(`NOT_FOUND`)
            }
            res.status(200).json(response)
        }
        catch (err) {
            next(err)
        }
    }

    static async updateEmployee(req, res, next) {
        try {
            const id = +req.params.id
            const { firstname, lastname, phoneNumber } = req.body
            const response = await Employee.update({
                firstname,
                lastname,
                phoneNumber
            }, {
                where: {
                    id
                }
            })
            // console.log(response[0]);
            if (response[0] !== 1) {
                throw new Error(`NOT_FOUND`)
            }
            res.status(200).json({
                statusCode: 200,
                message: `success edit coi`
            })
        }
        catch (err) {
            next(err)
        }
    }

    static async deleteEmployee(req, res, next) {
        try {
            const id = +req.params.id
            const response = await Employee.destroy({
                where: {
                    id
                }
            })
            if (!response) {
                throw new Error(`NOT_FOUND`)
            }
            res.status(200).json({
                statusCode: 200,
                message: `success delete`
            })
        }
        catch (err) {
            next(err)
        }
    }
}


module.exports = superController