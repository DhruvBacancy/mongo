const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  friend_ids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Friend = new mongoose.model("Friend", friendSchema);

module.exports = Friend;
