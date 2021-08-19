const express = require('express')
const router = express.Router()


//for login and ladning page
router.get('/',( req, res )=>{
    res.render('login',{
        layout:'login'
    });
}) 

//get /dashboard route
router.get('/dashboard',( req, res )=>{
    res.render('dashboard');
})


module.exports = router