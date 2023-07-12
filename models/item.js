const mongoose = require("mongoose");

// Create schema
const itemSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  price: {
    type: Number,
    required: [true, "Please add a price"],
    min: [10, "Please add a valid price, value is {VALUE}, min 10 USD"],
    max: [10000, "Please add a valid price, value is {VALUE}, max 10000 USD"],
  },
  quantity: {
    type: Number,
    required: [true, "Please add a quantity"],
    min: [0, "Please add a valid quantity, value is {VALUE}, min 0"],
    max: [10000, "Please add a valid quantity, value is {VALUE}, max 10000"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
    max: [
      300,
      "Please add a valid description, value is {VALUE}, max 300 character",
    ],
  },
  Image: {
    type: String,
    default: "uploads/no-image.png",
  },
});

// Create model
const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
