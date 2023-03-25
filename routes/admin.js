const path = require('path');
const auth = require('../middleware/isauthenicated');
const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', auth.isAuth , adminController.getAddProduct );

// /admin/products => GET
router.get('/products', auth.isAuth , adminController.getProducts );

// /admin/add-product => POST
router.post('/add-product', auth.isAuth , adminController.postAddProduct );

router.get('/edit-product/:productId', auth.isAuth , adminController.getEditProduct );

router.post('/edit-product', auth.isAuth , adminController.postEditProduct );

router.post('/delete-product', auth.isAuth , adminController.postDeleteProduct );

module.exports = router;
