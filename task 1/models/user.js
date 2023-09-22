const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: 32,
    required: true,
    uppercase: true,
  },
  age: {
    type: Number,
    min: 1,
    max: 100,
    required: true,
  },
  phone_no: {
    type: Number,
    validate: {
      validator: function (no) {
        return /^\d{10}$/.test(no);
      },
      message: (val) => `${val.value} is not valid`,
    },
    required: true,
  },
});

userSchema.pre("save", function (next) {
  this.name = this.name.toUpperCase();
  next();
});

userSchema.post("save", function () {
  console.log("User Saved sucessfully");
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
