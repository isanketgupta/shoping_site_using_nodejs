const path = require('path');
// const db = require('./util/database');
const mongoConnect = require('./util/database').mongoConnect;
const getDB = require('./util/database').getdb;
const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user')

const errorController = require('./controllers/error');

const app = express();

// db.execute('Select * From products')
//     .then( result => {
//         console.log(result[0])
//     })
//     .catch( err =>{
//         console.log(err)
//     })

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
    User.findById('63fedd961a560cb9062ba486')
      .then(user => {
        req.user = new User(user.name, user.email, user.cart, user._id);
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

mongoConnect( () => {
    app.listen(4000)
})
