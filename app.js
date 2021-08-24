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
const methodOverride = require('method-override')


//load config
dotenv.config({path: './config/config.env'})

//Passport config not module, then pass in the required passport from top in the file we have
require('./config/passport')(passport)


//connect using env or default
connectDB()

//bodyparser middleware
app.use(express.urlencoded({extended:false}))
//for api usage (4 future maybe)
app.use(express.json())

// Method override, placement is very important
app.use(
    methodOverride(function (req, res) {
      if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        let method = req.body._method
        delete req.body._method
        return method
      }
    })
  )

//logging reports 
if (process.env.NODE_ENV==='development'){
    app.use(morgan('dev'))
}


//hbs helper
const {formatDate, stripTags, truncate, editIcon  } = require('./helpers/hbs')

//handlebars~ejs
app.engine('.hbs', exphbs({
    helpers :
    {
        formatDate,
        stripTags,
        truncate,
        editIcon,
    },
    defaultLayout: 'main',
    extname: '.hbs'
}));
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

// Set global var
app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next()
  })

//routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))


//static middleware
app.use(express.static(path.join(__dirname,'public')))

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`server running in ${process.env.NODE_ENV} mode on port ${PORT}`))