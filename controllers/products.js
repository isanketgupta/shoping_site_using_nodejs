
const Product = require('../models/products');

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageURL;
    const price = req.body.price;
    const description = req.body.description;
    const userId = req.user._id
    const product = new Product(null, title, imageUrl, description, price, userId);
    product.save().then(
        () => {
            res.redirect('/');
        }
    ).catch(err => {console.log('error->'+err)});
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
    Product.fetchall().then(
        products => {
            console.log('get all product');
            res.render('shop', {
                prods: products,
                pageTitle: 'Shop',
                path: '/shop/shoping',
                hasProducts: products.length > 0,
                activeShop: true,
                productCSS: true
            });
        }
    ).catch(
        err => {
            console.log(err)
        }
    )
}

// exports.product = Product.fetchall();