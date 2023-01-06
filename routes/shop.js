const express = require('express');

const routes = express.Router();

routes.get('/shoping', (req, res, next) => {
    console.log('This is shoping page!');
    console.log(req.body);
    res.send('<H1>shoping page!!</H1>');
});

module.exports = routes ;