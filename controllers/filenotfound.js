const path = require('path');
const rootDir = require('../util/path');

exports.filenotfound = (req, res, next) => {
    res.render('404.ejs', {
        pageTitle: 'file not found',
        path: '/',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
      });
    console.log('This is a file not found page!!');
}