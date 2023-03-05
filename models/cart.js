const fs = require('fs');
const path = require('path');
const getDB = require('../util/database').getdb
const mongodb = require('mongodb');
const e = require('express');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {

  static addProduct(id, productPrice) {
    // Fetch the previous cart
    console.log('id ->'+id)
    console.log('productPrize ->'+productPrice)
    const db = getDB()

    // db.collection(products)
    // .find({ _id : new mongodb.ObjectId(id)})
    // .next()
    // .then( result => {
    //   console.log(result)
    //   return result
    // })
    // .catch( err => { 
    //   console.log(err) 
    // })

    let cartProd;
    const cart = db.collection('cart')
    .find()
    .toArray()
    .then( (cartData) => {
      console.log('success'+cartData.products)
      console.log('cartData'+cartData)
      console.log(JSON.stringify(cartData))
      if ( JSON.stringify(cartData) === '[]' ){
        console.log('cart is empty')
        db.collection('cart').insertOne({
          products : [{ id : id, quantity : 1, price : productPrice }],
          cartTotal : productPrice
        })
        return;
      }else{
          cartProd = cartData.products
          console.log('cart is not empty')
          const existingProductIndex = cartData.products.findIndex(
                prod => prod.id === id
              );
          const existingProduct = cart.products[existingProductIndex];
          if (existingProduct){
            console.log('product already exist')
            db.products.updateOne(
              { "products.id" : id },
              { $inc: { "products.quantity": 1 } }
           )
          }else{
            console.log('product not exist')
          }
          // if ( cartProd[0].id === id){
          //       console.log('product exist')
          //       console.log(id)
          // }else{
          //       console.log('adding product')
          //       console.log(id)
          // }
      }   
    })
    .catch( err => {
      console.log('err-->'+err)
    });
    
    // if (cartProd === null ){
    //   if ( cartProd.id === id){
    //       console.log('product exist')
    //       console.log(id)
    //   }else{
    //       console.log('adding product')
    //       console.log(id)
    //   }
    // }else{
    //   console.log('no data in cart')
    // }

    // if (cartProd.id = id ){
    //     console.log('product exist')
    // }
    // else{
    //   console.log('prodiuct doesnot exist in cart')
    // }
    


    // fs.readFile(p, (err, fileContent) => {
    //   let cart = { products: [], totalPrice: 0 };
    //   if (!err) {
    //     cart = JSON.parse(fileContent);
    //   }
    //   // Analyze the cart => Find existing product
    //   const existingProductIndex = cart.products.findIndex(
    //     prod => prod.id === id
    //   );
    //   const existingProduct = cart.products[existingProductIndex];
    //   let updatedProduct;
    //   // Add new product/ increase quantity
    //   if (existingProduct) {
    //     updatedProduct = { ...existingProduct };
    //     updatedProduct.qty = updatedProduct.qty + 1;
    //     cart.products = [...cart.products];
    //     cart.products[existingProductIndex] = updatedProduct;
    //   } else {
    //     updatedProduct = { id: id, qty: 1 };
    //     cart.products = [...cart.products, updatedProduct];
    //   }
    //   cart.totalPrice = cart.totalPrice + +productPrice;
    //   fs.writeFile(p, JSON.stringify(cart), err => {
    //     console.log(err);
    //   });
    // });
  }

  static deleteProduct(id, productPrice) {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return;
      }
      const updatedCart = { ...JSON.parse(fileContent) };
      const product = updatedCart.products.find(prod => prod.id === id);
      if (!product) {
          return;
      }
      const productQty = product.qty;
      updatedCart.products = updatedCart.products.filter(
        prod => prod.id !== id
      );
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * productQty;

      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        console.log(err);
      });
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
