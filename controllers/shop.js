const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');
const product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.find()
  .then(
    (data) => {
      // console.log('data->'+data)
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
  Product.find()
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
  req.user.populate('cart.items.productId')
  .execPopulate()
  .then(
    user => {
        const cartData = user.cart.items
        console.log('cart returned'+cartData);
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: cartData
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
    return req.user.removeFromCart(prodId);
    // res.redirect('/cart');
  // });
};

exports.getOrders = (req, res, next) => {
  Order
  .find({ 'User.userId' : req.user._id })
  .then( order => {
    console.log('orders->'+order)
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders : order
    });
  })
};

exports.postOrders = (req, res, next) => {
    req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then( user => {
        const products = user.cart.items.map( i => {
          return { quantity: i.quantity, product: { ...i.productId._doc } }
        });
        console.log(products)
        const order = new Order({
          User: {
            name: req.user.name,
            userId: req.user._id
          },
          Products : products
        });
        console.log(order)
        return order.save();
    })
    .then( result => { 
      res.redirect('/orders');
    })
    .then( () => {
      req.user.clearCart()
    })
    .catch( err => {
      console.log(err)
    })
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
