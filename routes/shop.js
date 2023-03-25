const path = require('path');
const auth = require('../middleware/isauthenicated')
const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', auth.isAuth , shopController.getIndex);

router.get('/products', auth.isAuth , shopController.getProducts);

router.get('/products/:productId', auth.isAuth , shopController.getProduct);

router.get('/cart', auth.isAuth , shopController.getCart);

router.post('/cart', auth.isAuth , shopController.postCart);

router.post('/cart-delete-item', auth.isAuth , shopController.postCartDeleteProduct);

router.post('/create-order', auth.isAuth , shopController.postOrder);

router.get('/orders', auth.isAuth , shopController.getOrders);

module.exports = router;
