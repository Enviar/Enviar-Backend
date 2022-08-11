const { readPayload } = require('../helpers/token')
const { Employee, Store, City } = require('../models')

const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers
        const getPayload = readPayload(access_token)
        const checkUser = await Employee.findByPk(+getPayload.id)
        if (!checkUser) {
            throw new Error(`Email_nf`)
        }
        // console.log(checkUser);
        const getStoreCity = await Store.findByPk(+checkUser.StoreId, {
            include: [City]
        })
        // console.log(getStoreCity.name);
        req.additionalData = {
            id: checkUser.id,
            email: checkUser.email,
            role: checkUser.role,
            storeId: checkUser.StoreId,
            storeName: getStoreCity.name,
            cityId: getStoreCity.City.id,
            cityName: getStoreCity.City.name
        }
        next()
    }
    catch (err) {
        next(err)
    }
}

module.exports = authentication