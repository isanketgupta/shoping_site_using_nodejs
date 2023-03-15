const path = require('path');
// const db = require('./util/database');
// const mongoConnect = require('./util/database').mongoConnect;
// const getDB = require('./util/database').getdb;
const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user')
const mongoose = require('mongoose')

const errorController = require('./controllers/error');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// app.use((req, res, next) => {
//     User.findById('63fedd961a560cb9062ba486')
//     .then( user => {
//         console.log('add user details'+user)
//         req.user = new User(user.name, user.email, user.cart, user._id);
//         next();
//     }).catch(
//         err => { console.log(err) }
//     )
//     // next()
// });

app.use((req, res, next) => {
    User.findById('640985018fc6b379dc3ea2c9')
      .then(user => {
        req.user = user;
        // console.log('user loged in'+user)
        next();
      })
      .catch(err => console.log(err));
});


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// mongoConnect( () => {
//     app.listen(4000)
// })

mongoose
  .connect('mongodb+srv://user2:LTHA8PaU7rYCFzFY@cluster0.l8xmgxg.mongodb.net/newShop?retryWrites=true&w=majority')
  .then( ressult => {
      console.log('Connected To Database!!')
      User
      .findOne()
      .then( user => {
        if (!user) {
          const newUser = new User({
            name : 'sanket',
            email: 'sanket@gmail.com',
            cart : {
              items: []
            }
          })
          newUser.save()
        }
      })
      app.listen(4000)
  })
  .catch( err => { 
    console.log('Failed To Connect to database!!')
    console.log(err) 
  });