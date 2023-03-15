const mongoose = require('mongoose');
const Schema = mongoose.Schema

const orderSchema = new Schema({
    Products: [{
        product : { 
            type : Object, 
            required: true 
        },
        quantity: { 
            type: Number,  
            required: true
        }
    }],
    User: [{
        name: {
            type : String, 
            required: true
        },
        userId: {
            type : Schema.Types.Object, 
            required: true, 
            ref: 'User'
        }
    }] 
})


module.exports = mongoose.model('Order', orderSchema )
