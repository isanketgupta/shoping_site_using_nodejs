

exports.isAuth = (req, res, next) => {
    auth = req.session.isAuthenticated
    if ( !auth ){
        console.log('auth-middleware failed'+auth)
         return res.redirect('/login')
    }
    console.log('auth->'+auth)
    next();
}