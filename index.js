const express = require("express");
const app = express();
const PORT = 3001;
const cors = require("cors");

const helmet = require("helmet");
const compression = require("compression");

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());

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
const managerRouter = require("./routes/Manager");
app.use("/manager", managerRouter);

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
