//this middleware is used in index.js not app.js 

module.exports = {
    ensureAuth: function(req,res,next){
        if(req.isAuthenticated()){
            return next()
        } else{
            res.redirect('/')
        }
    },
    //if logged in user wants to go to landing page and they shouldn't see the landing page
    ensureGuest: function (req,res,next){
        if(req.isAuthenticated()){
            res.redirect('/dashboard')
        } else{
            return next()
        }
    }
}