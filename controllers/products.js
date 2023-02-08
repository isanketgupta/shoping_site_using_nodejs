const path = require('path');
const rootDir = require('../util/path');
const Product = require('../models/products');

exports.postAddProduct = (req, res, next) => {
    console.log('Product Added');
    // console.log(req.body);
    const product = new Product(req.body.title);
    product.save();
    // console.log(Product.fetchall());
    next();
}

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
      });
    console.log('This is product details page!!');
    // res.sendFile(path.join(rootDir , 'views', 'add-product.html'));
}

exports.getAllProduct = (req, res, next) => {
    // console.log('assadk')
    Product.fetchall( products => {
        console.log('get all product');
        res.render('shop', {
            prods: products,
            pageTitle: 'Shop',
            path: '/shop/shoping',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });
}

// exports.product = Product.fetchall();