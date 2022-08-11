
if (process.env.NODE_ENV != 'production') {
    require("dotenv").config()
}
const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes/index')
const cors = require('cors')
require('dotenv').config()
const { errorHandling } = require('./middleware/errorHandling')
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.use(routes)
app.use(errorHandling)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

//npx sequelize model:create --name Product --attributes senderName:string,senderPhone:string,recipientName:string,recipientPhone:string,recipientAddress:string,recipientCity:integer,weightProduct:integer,typeProduct:string,receiptNumber:string,shipmentPrice:integer

//npx sequelize model:create --name Status --attributes EmployeeId:integer,ProductId:integer,notes:text,CityId:integer