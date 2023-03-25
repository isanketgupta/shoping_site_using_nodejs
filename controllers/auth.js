const User = require('../models/user')

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login'
  });
};



exports.postLogin = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  User
  .findOne({ email : email })
  .then( result => {
        if (result){
            console.log('login seccessful')
            req.session.isAuthenticated = true;
            req.session.user = result;
            req.session.save( result => {
              console.log('err'+result)
              res.redirect('/')
            })
        }else{
            console.log('login failed')
            res.redirect('/login')
        }
  })
  .catch( err => {
    console.log(err);
  })
};