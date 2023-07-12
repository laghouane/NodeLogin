const mongoose = require('mongoose');

// Create schema
const orderSchema = mongoose.Schema({
    status: {
        type: String,
      enum: ['created', 'canceled'],
      default: 'created'
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    total: {
        type: Number,
        required: [true, 'Please add a total price'],
        min: [0, 'Please add a valid total price, value is {VALUE}, min 0 USD']
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please add a client user']
    },
    purchases: [
        {
          item: {
            type: mongoose.Types.ObjectId,
            ref: 'Item',
            required: [true, 'Please add an item']
          },
          quantity: {
            type: Number,
            required: [true, 'Please add a quantity']
          }
        }
      ]
    

})

// Create model
const Order = mongoose.model('Order', orderSchema)

module.exports = Order