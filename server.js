
//https://openweathermap.org/img/wn/04d@2x.png

const express = require('express')
const expensesApi = require('./routes/api')
const path = require('path')
const axios = require("axios");

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(express.static(path.join(__dirname, 'dist')))


app.use('/',expensesApi)

const port = 3000
app.listen(port, function () {
    console.log(`Server running on ${port}`)
})
