const Product = require('../models/product');
const User = require('../models/user');

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(
    (data) => {
      res.render('shop/product-list', {
        prods: data,
        pageTitle: 'All Products',
        path: '/products'
      });
    }
  )
  .catch(
    err => {
      console.log(err);
    }
  )
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
  .then(
    (product) => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      })
    })
  .catch(err => {console.log(err)})
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(
    (data) =>{
        res.render('shop/index', {
          prods: data,
          pageTitle: 'Shop',
          path: '/'
        });      
    }
  )
  .catch( err => {console.log(err)})
};

exports.getCart = (req, res, next) => {
  const userId = req.user._id
  User.getCart(userId).then(
    cart => {
        console.log('cart returned'+JSON.stringify(cart));
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: cart
        });
      }
  ).catch( err => { 
    console.log(err)
  });

    // Product.fetchAll(products => {
      // const cartProducts = [];
      // for (product of products) {
      //   const cartProductData = cart.products.find(
      //     prod => prod.id === product.id
      //   );
      //   if (cartProductData) {
      //     cartProducts.push({ productData: product, qty: cartProductData.qty });
      //   }
      // }
    // });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  // console.log(req.user)
  Product.findById(prodId)
  .then( product => {
    return req.user.addToCart(product)
  })
  .then( result => {
    console.log(result)
  })
  .catch( err => { 
    console.log(err)
  });
  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;

  // Product.findById(prodId, product => {
    req.user.deleteFromCart(prodId);
    res.redirect('/cart');
  // });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
