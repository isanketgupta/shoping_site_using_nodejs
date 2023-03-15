const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const userSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type : String,
        required: true
    },
    cart : {
        items: [ 
            { 
                productId: { 
                    type: Schema.Types.ObjectId ,
                    ref : 'Product',
                    required: true 
                },
                quantity : { 
                    type: Number,
                    required: true 
                } 
            } 
        ]
    } 
})



userSchema.methods.addToCart = function (product) {
    const cartProductIndex = this.cart.items.findIndex( cp => {
        return cp.productId.toString() === product._id.toString()
    })
    let newQuantity = 1;
    const updatedCartProduct = [ ...this.cart.items ]
    console.log(cartProductIndex)

    if ( cartProductIndex >= 0 ) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        // console.log('adding to list to cart'+updatedCartProduct)
        updatedCartProduct[cartProductIndex].quantity = newQuantity
        // console.log('adding to list to cart'+updatedCartProduct)
    }else{
        updatedCartProduct.push({
            productId: product._id,
            quantity: newQuantity
        })
        console.log('adding new product to cart'+updatedCartProduct)
    }

    const updateCart = {
        items : updatedCartProduct
    }

    this.cart = updateCart
    this.save();
}

userSchema.methods.removeFromCart = function (productId) {
    const updateCartItems = this.cart.items.filter( items => {
        return items.productId.toString() !== productId.toString();
    })
    console.log('items'+updateCartItems)
    this.cart.items = updateCartItems
    return this.save()
}

userSchema.methods.clearCart = function (productId) {
    this.cart = { items: [] };
    return this.save()
}

module.exports = mongoose.model('User', userSchema)


// const getDB = require('../util/database').getdb
// const mongodb = require('mongodb')

// module.exports = class User {
//     constructor(username , email , cart, id )
//     { 
//         this.name = username
//         this.email = email 
//         this.cart = cart
//         this._id = id
//     }

//     save(){
//         const db = getDB()
//                 db.collection('user')
//                 .insertOne(this)
//                 .then( result => {
//                     console.log(result)
//                 })
//                 .catch(err => {
//                     console.log(err)
//                 })
//     }

    // addToCart(product){

    //     console.log(this.cart.items)

    //     const cartProductIndex = this.cart.items.findIndex( cp => {
    //         return  cp._id.toString() === product._id.toString()
    //     });

    //     console.log('index is '+cartProductIndex)
    //     const updatedCartProduct = [ ...this.cart.items ];

    //     if ( cartProductIndex >= 0 ){
    //         const newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    //         updatedCartProduct[cartProductIndex].quantity = newQuantity
    //     }else{
    //         updatedCartProduct.push({ ...product , quantity : 1 })
    //     }   

    //     const newCartTotal = parseInt(this.cart.cartTotal) + parseInt(product.price);
    //     console.log('adding to cart '+newCartTotal)
    //     const db = getDB()
    //     const updateCart = { items : updatedCartProduct , cartTotal : newCartTotal }
    //     return db.collection('users')
    //     .updateOne(
    //         { _id : new mongodb.ObjectId(this._id)},
    //         { $set: { cart : updateCart } }
    //     )

    //     res.redirect('/cart');
    // }

    // static getCart(userID){
    //     const db = getDB()
    //     console.log('user id'+userID)
    //     return db.collection('users')
    //     .findOne( { _id: new mongodb.ObjectId(userID) } )
    //     .then( result => {
    //         console.log('result->'+JSON.stringify(result))
    //         return result.cart.items;
    //     })
    //     .catch( err => { 
    //         console.log(err) 
    //     });
    // }
    
    // deleteFromCart(id){
    //     console.log('delete prod id->'+id)

    //     const cartProductIndex = this.cart.items.findIndex( cp => {
    //         return  cp._id.toString() === id.toString()
    //     });

    //     const updatedCartProduct = [ ...this.cart.items ];
       
    //     const prodQuantity = this.cart.items[cartProductIndex].quantity;
    //     const prodPrice = this.cart.items[cartProductIndex].price;
    //     const prodTotalPrice = prodPrice * prodQuantity
    //     console.log(this.cart.cartTotal)
    //     const newCartTotal = this.cart.cartTotal - prodTotalPrice

    //     updatedCartProduct.splice(cartProductIndex,1);

    //     console.log('x->'+JSON.stringify(updatedCartProduct)+'-->'+newCartTotal)

    //     const db = getDB()
    //     const updateCart = { items : updatedCartProduct , cartTotal : newCartTotal }
    //     return db.collection('users')
    //     .updateOne(
    //         { _id : new mongodb.ObjectId(this._id)},
    //         { $set: { cart : updateCart } }
    //     )
    // }

    // static findById(id){
    //     const db = getDB()
    //     return db.collection('users')
    //     .findOne({_id : new mongodb.ObjectId(id)})
    //     .then( result => { 
    //         console.log('user'+result)
    //         return result
    //     })
    //     .catch(err => { 
    //         console.log(err) 
    //     });  
    // }
// }