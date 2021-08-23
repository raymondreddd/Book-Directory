const express = require('express')
const router = express.Router()
const passport = require('passport')

//for google authentication see comments below pa
//we are using google startegy which we created in passport.JS file, to get scope which is profile
router.get('/google', passport.authenticate('google',{ scope: ['profile'] })) 

//callback 
router.get(
    '/google/callback',
    passport.authenticate('google',{failureRedirect:'/'}), (req,res) => {
res.redirect('/dashboard')
}
)

// for logging out user 
//route: /aouth/logout

//Passport exposes a logout() function on req (also aliased as logOut() ) that can be called from any route handler which needs to terminate a login session.
router.get('/logout', (req,res) => {
    req.logout()
    res.redirect('/')
})


module.exports = router


/*
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
*/