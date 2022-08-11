const { City, Store } = require('../models')

class locationController {
    static async addCity(req, res, next) {
        try {
            const { name } = req.body
            const response = await City.create({ name })
            res.status(201).json({
                statusCode: 201,
                message: `City has been created`
            })
        }
        catch (err) {
            next(err)
        }
    }

    static async addStore(req, res, next) {
        try {
            const { name, phone, CityId } = req.body
            const response = await Store.create({ name, phone, CityId })
            res.status(201).json({
                statusCode: 201,
                message: `Store has been created`
            })
        }
        catch (err) {
            next(err)
        }
    }
}

module.exports = locationController