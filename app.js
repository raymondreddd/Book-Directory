const express = require('express')
const app = express()
const dotenv= require('dotenv')
const expressLayouts = require('express-ejs-layouts')
const connectDB = require('./config/db')

//load config
dotenv.config({path: './config/config.env'})

connectDB()

const PORT = process.env.PORT || 3000


// app.set('view engine','ejs')
// app.set('views',__dirName + '/views')
// app.set('layout','layouts/layout')
// app.use(expressLayouts)
// app.use(express.static('public'))


//123LMS123book123
app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))