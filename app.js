const express = require('express')
const app = express()
const dotenv= require('dotenv')
//middleware axil on wheels, right after express logs in 
const morgan=require('morgan')
const expressLayouts = require('express-ejs-layouts')
const exphbs = require('express-handlebars')
const connectDB = require('./config/db')
const path = require('path')


//load config
dotenv.config({path: './config/config.env'})

connectDB()
const PORT = process.env.PORT || 3000

//logging reports 
if (process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

//handlebars~ejs
app.engine('.hbs', exphbs({defaultLayout: 'main',extname: '.hbs'}));
app.set('view engine', '.hbs');

//routes
app.use('/',require('./routes/index'))

//static middleware
app.use(express.static(path.join(__dirname,'public')))

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))