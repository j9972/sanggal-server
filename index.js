const express = require("express");
const app = express();
const PORT = 3001;
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");

const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
const commentRouter = require("./routes/Comments");
app.use("/comments", commentRouter);
const userRouter = require("./routes/Users");
app.use("/users", userRouter);
const likeRouter = require("./routes/Likes");
app.use("/likes", likeRouter);
const hateRouter = require("./routes/Hates");
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
