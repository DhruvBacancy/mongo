const express = require("express");
const router = express.Router();

const { addFriend } = require("../controller/friendController");
const asyncRouteHandler = require("../util/asyncRouteHandler");

router.get("/find-firends", (req, res) => {
  res.send({ message: "friends routes" });
});

router.post("/add", asyncRouteHandler(addFriend));

module.exports = router;
