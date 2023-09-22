const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");
const friendRoutes = require("./routes/friendRoutes");
const { errorHandler } = require("./util/errorHandler");

const app = express();
app.use(express.json());

dbconnect().catch((err) => {
  console.log(err);
});

app.use("/user", userRoutes);
app.use("/friend", friendRoutes);

app.use(errorHandler);

async function dbconnect() {
  await mongoose
    .connect(
      "mongodb+srv://dhruvpatel:admin@cluster0.l1vhwpm.mongodb.net/task1"
    )
    .then(() => {
      console.log("Connected to Mongo Atlas");
    });
}

app.listen(5000, () => {
  console.log("Server running on 5000");
});
