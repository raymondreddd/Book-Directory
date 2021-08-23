const express = require('express')
const app = express()
const mongoose= require('mongoose')
const dotenv= require('dotenv')
//middleware axil on wheels, right after express logs in 
const morgan=require('morgan')
const expressLayouts = require('express-ejs-layouts')
const exphbs = require('express-handlebars')
const connectDB = require('./config/db')
const passport=require('passport')
const path = require('path')
const session=require('express-session')
const MongoStore = require('connect-mongo')

//load config
dotenv.config({path: './config/config.env'})

//Passport config not module, then pass in the required passport from top in the file we have
require('./config/passport')(passport)


//connect using env or default
connectDB()


//logging reports 
if (process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}

//handlebars~ejs
app.engine('.hbs', exphbs({defaultLayout: 'main',extname: '.hbs'}));
app.set('view engine', '.hbs');

//session middleware
//resave means save nothing if nothing is modified, saveUninitialized false means dont save a session if nothing is stored
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store:MongoStore.create({ mongoUrl:process.env.MONGO_URI }),
     })
)

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())


//routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))


//static middleware
app.use(express.static(path.join(__dirname,'public')))

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))