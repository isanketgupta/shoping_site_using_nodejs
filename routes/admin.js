const express = require('express');
const path = require('path');
const rootDir = require('../util/path');

const routes = express.Router();

routes.use('/add-product', (req, res, next) => {
    console.log('This is product details page!!');
    res.sendFile(path.join(rootDir , 'views', 'add-product.html'));
 //   res.send('<form name="title" method="post" action="/admin/add-product"> <input type="textbox" name="username"></input><button type="submit">submit</button></form>'); 
});

routes.post('/add-product', (req, res, next) => {
    console.log('This is product details page!');
    console.log(req.body);
    res.send('Product added!!')
});

module.exports = routes;