const Friend = require("../models/friend");
const User = require("../models/user");

const getFriends = async (req, res) => {
  const userId = req.params.userId;

  const user = await User.findById(userId, "-_id -__v");

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const friends = await Friend.find({ user_id: userId }).populate(
    "friend_ids",
    "-_id name age"
  );

  if (friends.length > 0) {
    res.status(200).json({ user, friends: friends[0].friend_ids });
  } else {
    throw new Error("Friends empty");
  }
};

const addUser = async (req, res) => {
  const { name, age, phone_no } = req.body;

  const newUser = new User({ name, age, phone_no });

  await newUser.save();

  res.status(201).json({ message: "User Created ", user: newUser });
};

module.exports = {
  getFriends,
  addUser,
};
