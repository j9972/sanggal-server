const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");

const { Posts, Likes, Hates } = require("../models");

router.get("/", async (req, res) => {
  const listOfPosts = await Posts.findAll({
    include: [Likes, Hates], // posts + likes, hates 테이블 연결
    attributes: {
      exclude: ["password"],
    },
  });
  res.json(listOfPosts);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const post = await Posts.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  res.json(post);
});

router.post("/", async (req, res) => {
  const { username, password, title, postText } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    Posts.create({
      username,
      password: hash,
      title,
      postText,
    });
    res.json({ username, password, title, postText });
  });
  /*
  const post = req.body;
  await Posts.create(post);
  res.json(post);
  */
});

router.delete("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const { newPassword } = req.body;

  // postId
  const user = await Posts.findOne({
    where: {
      id: postId,
    },
  });
  console.log("newPassword:", newPassword, "user:", user.password);
  if (user) {
    bcrypt.compare(newPassword, user.password).then(async (match) => {
      if (!match) {
        res.json({ error: "wrong password entered" });
      } else {
        bcrypt.hash(newPassword, 10).then((hash) => {
          Posts.destroy({
            where: {
              id: postId,
            },
          });

          res.json("DELETE SUCCESS");
        });
      }
    });
  } else {
    res.json({ error: " NO USER IN OUR DATABASE" });
  }
});

//const { oldPassword, newPassword } = req.body;

module.exports = router;
