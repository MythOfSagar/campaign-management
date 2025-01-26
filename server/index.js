const express = require("express");
const cors = require("cors");

const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.route");
const { resourceRouter } = require("./routes/resource.route");

const app = express();

app.use(express.json());

app.use(function (_, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS, PATCH");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/users", userRouter);
app.use("/resources", resourceRouter);

app.get("/", (req, res) => {
  res.send("Resource Managment");
});


app.listen(5555, async () => {
  try {
    await connection;
    console.log("SuccessFully Connected");
  } catch (err) {
    console.log("Error while Connecion",err);
  }
});
