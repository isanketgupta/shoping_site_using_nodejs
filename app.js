const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const app = express();

app.use(bodyParser.urlencoded({extended : false}));

app.use(adminRoutes);
app.use(shopRoutes);


app.use('/home', (req, res, next) => {
    console.log('This is a home page!');
    res.send('<h1>This is home page </h1>');
});

app.use((req, res, next) => {
    console.log('page not found!');
    res.send('<h1>page not found!</h1>');
});


app.listen(3000);