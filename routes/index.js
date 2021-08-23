const express = require('express')
const router = express.Router()
//to ensure logged in and not logged in users
const { ensureAuth, ensureGuest} = require('../middleware/auth')

//for login and ladning page
router.get('/', ensureGuest,( req, res )=>{
    res.render('login',{
        layout:'login'
    });
}) 

//get /dashboard route
router.get('/dashboard',ensureAuth,( req, res )=>{
    res.render('dashboard');
})


module.exports = router