const express = require('express')
const router = express.Router()
//to ensure logged in and not logged in users
const { ensureAuth, ensureGuest} = require('../middleware/auth')
const Story = new require('../models/Story')

//for login and ladning page
//only guest can see the login 
router.get('/', ensureGuest,( req, res )=>{
    res.render('login',{
        layout:'login'
    });
}) 

//get /dashboard route
router.get('/dashboard',ensureAuth,async ( req, res )=>{
    //
    try{
        const stories = await Story.find({user:req.user.id}).lean()
        res.render('dashboard',{
            name:req.user.firstName,
            stories
        });
    } catch (err){
        console.log(err);
        res.render('error/500')
    }
    
})


module.exports = router