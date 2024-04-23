const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: false,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    postcode: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: false,
    },
    parent: { type: mongoose.Types.ObjectId, ref: "order" },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
      },
    ],
    seller: { type: mongoose.Types.ObjectId, ref: "user" },
    customer: { type: mongoose.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);

const order = mongoose.model("order", orderSchema);
module.exports = order;
