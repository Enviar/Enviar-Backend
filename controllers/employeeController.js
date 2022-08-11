const e = require('express')
const { compareHash } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/token')
const { Employee, Store, City } = require('../models')

class employeeController {
    static async RegisterEmployee(req, res, next) {
        try {
            const { email, password, firstname, lastname, phoneNumber, role, StoreId } = req.body
            const response = await Employee.create({
                email, password, firstname, lastname, phoneNumber, role, StoreId
            })

            res.status(201).json({
                statusCode: 201,
                message: `User Has been Created`
            })
        } catch (err) {
            next(err)
        }
    }

    static async LoginEmployee(req, res, next) {
        try {
            const { email, password } = req.body
            const response = await Employee.findOne({
                where: {
                    email
                }
            })
            if (!response) {
                throw new Error(`passwordsalah`)
            }
            const user_account = compareHash(password, response.password)
            if (!user_account) {
                throw new Error(`passwordsalah`)
            }
            const storeLoc = await Store.findByPk(+response.StoreId, {
                include: [City]
            })
            const payload = {
                id: response.id,
                email: response.email,
                role: response.role
            }
            let cityCom = ""
            if (storeLoc.City.name.split(" ")[0] == `Kabupaten`) {
                cityCom = `Kab. ${storeLoc.City.name.split(" ")[1]} `
            } else {
                cityCom = storeLoc.City.name.split(" ")[1]
            }
            console.log(cityCom);
            const token = createToken(payload)
            // console.log(storeLoc);
            res.status(200).json({
                statusCode: 200,
                access_token: token,
                Courier_loc: cityCom
            })
        }
        catch (err) {
            next(err)
        }
    }

    static async checkPrice(req, res, next) {
        try {
            let output = 0
            const { origin, destination, services, weight } = req.body
            output = Math.abs(destination - origin) * 1000
            if (output < 10000) {
                output = 10000
            } else if (output > 20000) {
                output = 20000
            }
            output = output * weight
            if (services == `extra`) {
                output += 7000
            }
            // console.log(output);
            res.status(200).json({
                statusCode: 200,
                data: output
            })
        }
        catch (err) {
            next(err)
        }
    }
}

module.exports = employeeController