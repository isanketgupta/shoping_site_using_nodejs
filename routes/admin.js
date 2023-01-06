const express = require('express');

const routes = express.Router();

routes.use('/add-product', (req, res, next) => {
    console.log('This is product details page!');
    res.send('<form name="title" method="POST" action="/product"> <input type="textbox" name="username"></input><button type="submit">submit</button></form>'); 
});

routes.use('/product', (req, res, next) => {
    console.log('This is product details page!');
    console.log(req.body);
    res.redirect('/');
});

module.exports = routes;