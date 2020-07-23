const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.ObjectId,
    ref: "Admin",
    required: true,
  },
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: "Customer",
    require: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        requried: true,
      },
      quantity: {
        type: Number,
        validator: function (v) {
          return v === parseInt(v);
        },
        message: "Quantity must be a whole number",
      },
    },
  ],
});

modules.export = mongoose.model("Order", orderSchema);
