// const fs = require('fs');
const mongodb = require('mongodb');
const getDB = require('../util/database').getdb;


const Cart = require('./cart');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price , userId) {
    this._id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.userId = userId;
  }

  save() {
      const db = getDB();
      let dbOp;
      if (this._id){
          console.log('editing Product')
          dbOp = db.collection('products').updateOne({ _id : this._id },
                                                     { $set: this })
      }else{
          console.log('creating new product')
          dbOp = db.collection('products').insertOne(this)
      }
      dbOp
      .then( result => {
          console.log('product added->'+result)
      })
      .catch( err => {
        console.log(err) 
      });
  }

  static deleteById(id) {
    const db = getDB()
    return db.collection('products')
    .deleteOne({ _id : new mongodb.ObjectId(id) })
    .then( result => {
        console.log(result);
        return result;
    }).catch( err => {
      console.log(err);
    });
  }

  static fetchAll() {
    const db = getDB() 
    return db.collection('products')
    .find()
    .toArray()
    .then( result => {
      console.log('all data->'+result)
      return result
    })
    .catch(err => {
      console.log(err)
    });
  }

  static findById(prodid) {
    // return db.execute('Select * From products WHERE id = ? ',[id])
    const db = getDB() 
    console.log(prodid)
    return db.collection('products')
    .find({ _id : new mongodb.ObjectId(prodid) })
    .next()
    .then( result => {
      //console.log('find by id->'+result)
      return result
    })
    .catch(err => {
      console.log(err)
    });
  }

  static editById() {
    // return db.execute('Select * From products WHERE id = ? ',[id])
    // const db = getDB() 
    // console.log(prodid)
    // return db.collection('products')
    // .updateOne({ _id : new mongodb.ObjectId(prodid) },
    //            {  })
    // .next()
    // .then( result => {
    //   //console.log('find by id->'+result)
    //   return result
    // })
    // .catch(err => {
    //   console.log(err)
    // });
    const db = getDB();
    return db.collection('products')
    .insertOne(this)
    .then( restult => {
        console.log('product added->'+restult)
    })
    .catch( err => {
      console.log(err) 
    });
  }


};
