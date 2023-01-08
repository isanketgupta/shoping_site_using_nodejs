const express = require('express');
const path = require('path')
const rootDir = require('../util/path');
const routes = express.Router();

routes.get('/shoping', (req, res, next) => {
    console.log('This is shoping page!');
    console.log(req.body);
    res.sendFile(path.join(rootDir, 'views','shop.html'));
});

module.exports = routes ;