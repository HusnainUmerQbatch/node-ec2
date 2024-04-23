const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    asin: {
      type: String,
      required: true,
      unique:true
    },
    user: { type: mongoose.Types.ObjectId, ref: 'user' }, 
  },
  {
    timestamps: true,
  }
);


const product = mongoose.model("product", productSchema);
module.exports = product;