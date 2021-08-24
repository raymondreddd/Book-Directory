const express = require('express')
const router = express.Router()
//to ensure logged in and not logged in users
const { ensureAuth} = require('../middleware/auth')
const Story = new require('../models/Story')

//for showing add page
//only guest can see the login 
router.get('/add', ensureAuth,( req, res )=>{
    res.render('stories/add');
}) 


//process the add form
//POST req
router.post('/', ensureAuth,async ( req, res )=>{
    try{
        req.body.user = req.user.id
        await Story.create(req.body)
        res.redirect('/dashboard')
    } catch(err){
        console.log(err);
        res.render('error/500')
    }
    
}) 

//showing all stories
router.get('/', ensureAuth,async ( req, res )=>{
    try{
        const stories= await Story.find({ status: 'public'})
        .populate('user')
        .sort({ createdAt: 'desc'})
        .lean()

        res.render('stories/index',{
            stories,
        })
    } catch (err){
        console.log(err);
        res.render('error/500');
    }
    
}) 

//show edit page
router.get('/edit/:id', ensureAuth,async ( req, res )=>{
    const story = await Story.findOne({_id: req.params.id}).lean()

    if(!story){
        return res.render('error/404')
    }
    if(story.user != req.user.id){
        res.redirect('/stories')
    }
    else{
        res.render('stories/edit',{story})
    }
}) 

//update story
router.put('/:id', ensureAuth,async ( req, res )=>{
    //let is imp
    let story= await Story.findById(req.params.id).lean()
    if(!story){
        return res.render('error/404')
    }
    if(story.user != req.user.id){
        res.redirect('/stories')
    }
    else {
        story = await Story.findOneAndUpdate({ _id: req.params.id }, req.body, {
          new: true,
          runValidators: true,
        })
    }
    res.redirect('/dashboard')
}
) 


module.exports = router