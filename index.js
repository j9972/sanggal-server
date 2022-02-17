const express = require("express");
const app = express();
const PORT = 3001;
const cors = require("cors");

// require("dotenv").config();
app.use(express.json());
app.use(cors());

const db = require("./models");

const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
const commentRouter = require("./routes/Posts");
app.use("/comments", commentRouter);
const userRouter = require("./routes/Posts");
app.use("/users", userRouter);
const likeRouter = require("./routes/Posts");
app.use("/likes", likeRouter);
const hateRouter = require("./routes/Posts");
app.use("/hates", hateRouter);

db.sequelize
  .sync()
  .then(() => {
    app.listen(process.env.PORT || 3001, () => {
      console.log(`server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
