const getDB = require('../util/database').getdb
const mongodb = require('mongodb')


module.exports = class User {
    constructor(username , email , cart, id )
    { 
        this.name = username
        this.email = email 
        this.cart = cart
        this._id = id
    }

    save(){
        const db = getDB()
        // if (this.user && this.password ){
            
        //     const checkuser = db.collection('user').findOne({user: this.user})
        //     if (checkuser)
        //     {
        //         console.log('user already exist')
        //     }else{
                db.collection('user')
                .insertOne(this)
                .then( result => {
                    console.log(result)
                })
                .catch(err => {
                    console.log(err)
                })
        //     }
        // } 
        // console.log('save function')
    }

    addToCart(product){

        console.log(this.cart.items)

        const cartProductIndex = this.cart.items.findIndex( cp => {
            return  cp._id.toString() === product._id.toString()
        });

        console.log('index is '+cartProductIndex)
        const updatedCartProduct = [ ...this.cart.items ];

        if ( cartProductIndex >= 0 ){
            const newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartProduct[cartProductIndex].quantity = newQuantity
        }else{
            updatedCartProduct.push({ ...product , quantity : 1 })
        }   

        const newCartTotal = parseInt(this.cart.cartTotal) + parseInt(product.price);
        console.log('adding to cart '+newCartTotal)
        const db = getDB()
        const updateCart = { items : updatedCartProduct , cartTotal : newCartTotal }
        return db.collection('users')
        .updateOne(
            { _id : new mongodb.ObjectId(this._id)},
            { $set: { cart : updateCart } }
        )

        res.redirect('/cart');


        // const db = getDB()

        // let itemArray;
        // const checkItemExist =  db.collection('users')
        // .findOne({ _id : new mongodb.ObjectId(this._id)})
        // .then( result => { 
        //     itemArray = result.cart.items.length
        //     console.log(itemArray)

        //     if ( result.cart.items.length === 0 ){
        //         console.log('adding to cart')
        //         newCartTotal = this.cart.cartTotal + product.price;
        //         const updateCart = { items : updatedCartProduct , cartTotal : newCartTotal }
        //         return db.collection('users')
        //         .updateOne(
        //             { _id : new mongodb.ObjectId(this._id)},
        //             { $set: { cart : updateCart } }
        //         )
        //     }else{
        //         console.log('incrrementing qunatity')
        //         const existingProductIndex = result.cart.items.findIndex(
        //             prod => prod._id === product._id
        //         );

        //         console.log(existingProductIndex)
        //     } 
        // })
        // .catch( err => {console.log(err)} )

        // db.collection('users')
        // .updateOne({ "cart.items._id" : new mongodb.ObjectId(product._id) },
        //             { $inc: { "cart.items.quantity" : 1 } })
        // .then ( result => { 
        //     console.log(result)
        //     return result
        // })
        // .catch( err => { 
        //     console.log(err) 
        // })

        // console.log('item array'+itemArray)
        // const existingProductIndex = db.collection('users').cart.items.findIndex(
        //     prod => prod.id === product._id
        //   );
    }

    static getCart(userID){
        const db = getDB()
        console.log('user id'+userID)
        return db.collection('users')
        .findOne( { _id: new mongodb.ObjectId(userID) } )
        .then( result => {
            console.log('result->'+JSON.stringify(result))
            return result.cart.items;
        })
        .catch( err => { 
            console.log(err) 
        });
    }
    
    deleteFromCart(id){
        console.log('delete prod id->'+id)

        const cartProductIndex = this.cart.items.findIndex( cp => {
            return  cp._id.toString() === id.toString()
        });

        const updatedCartProduct = [ ...this.cart.items ];
       
        const prodQuantity = this.cart.items[cartProductIndex].quantity;
        const prodPrice = this.cart.items[cartProductIndex].price;
        const prodTotalPrice = prodPrice * prodQuantity
        console.log(this.cart.cartTotal)
        const newCartTotal = this.cart.cartTotal - prodTotalPrice

        updatedCartProduct.splice(cartProductIndex,1);

        console.log('x->'+JSON.stringify(updatedCartProduct)+'-->'+newCartTotal)

        const db = getDB()
        const updateCart = { items : updatedCartProduct , cartTotal : newCartTotal }
        return db.collection('users')
        .updateOne(
            { _id : new mongodb.ObjectId(this._id)},
            { $set: { cart : updateCart } }
        )

        // const db = getDB()
        // return db.collection('user')
        // .updateOne(
        //     { _id : this._id },
        //     { $pull: { 'cart.items.id': new mongodb.ObjectId(id) } })
        // .then( result => { console.log(result)})
        // .catch(err => { console.log(err)})
    }

    static findById(id){
        const db = getDB()
        return db.collection('users')
        .findOne({_id : new mongodb.ObjectId(id)})
        .then( result => { 
            console.log('user'+result)
            return result
        })
        .catch(err => { 
            console.log(err) 
        });  
    }
}