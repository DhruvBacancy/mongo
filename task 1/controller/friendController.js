const Friend = require("../models/friend");
const User = require("../models/user");

exports.addFriend = async (req, res) => {
  const { userId, friendId } = req.body;

  const user = await User.findById(userId);
  const friend = await Friend.findById(friendId);

  if (!user) {
    return res.status(402).json({ error: "User or not found" });
  }

  if (userId === friendId) {
    return res
      .status(402)
      .json({ error: "Adding yorself as friend in not allowed" });
  }

  const newFriend = await Friend.findOne({ user_id: userId });

  if (newFriend) {
    if (newFriend.friend_ids.includes(friendId)) {
      throw new error("Friend exists");
    } else {
      newFriend.friend_ids.push(friendId);
      await newFriend.save();
    }
  } else {
    const friendship = new Friend({ user_id: userId, friend_ids: [friendId] });
    await friendship.save();
  }
  res.status(200).json({ message: "Friend Added" });
};

