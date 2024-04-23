const mongoose = require("mongoose");

const orderdProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    subTotal: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const orderedProduct = mongoose.model("orderedProduct", orderdProductSchema);
module.exports = orderedProduct;
