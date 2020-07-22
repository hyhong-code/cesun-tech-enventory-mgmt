const mongoose = require("mongoose");
const QRCode = require("qrcode");

const productSchema = new mongoose.Schema({
  admin: {
    type: mongoose.Schema.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: [true, "A product name is required"],
    minlength: [10, "A product name is at least 10 characters long"],
    maxlength: [50, "A product name must be no long then 50 characters"],
  },
  description: {
    type: String,
    required: [true, "A product description is required"],
    minlength: [50, "A product description is at least 50 characters long"],
    maxlength: [
      500,
      "A product description must be no long then 500 characters",
    ],
  },
  qrCode: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "A price is required"],
    min: [0, "A price must be greater than 0"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Stores QR Code that contains product id
productSchema.pre("save", async function (next) {
  if (!this.isNew) return next();
  this.qrCode = await QRCode.toDataURL(this.id, {
    errorCorrectionLevel: "H",
    type: "image/png",
  });
});

module.exports = mongoose.model("Product", productSchema);
