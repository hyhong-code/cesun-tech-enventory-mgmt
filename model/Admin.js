const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "A username is required"],
    unique: [true, "This username is not available"],
    match: [
      /^[a-zA-Z0-0\-_]+$/,
      "A usename must only contain a-z, A-Z, 0-9, -, and _",
    ],
    minlength: [3, "A username must be at least 3 characters long"],
    maxlength: [15, "A username must be no more than 15 characters long"],
  },
  password: {
    type: String,
    required: [true, "A password is required"],
    minlength: [6, "A password must be at least 6 characters long"],
  },
  passwordConfirmation: {
    type: String,
    required: [true, "Password confirmation is required"],
    validate: {
      validator: function (v) {
        return v === this.password;
      },
      message: "Passwords do not match",
    },
  },
  accessLevel: {
    type: Number,
    enum: {
      values: [1, 2, 3],
      message: "Access level must be either 1, 2, or 3",
    },
    default: 1,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Admin", adminSchema);
