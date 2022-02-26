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
    include: [Likes, Hates],
    attributes: { exclude: ["password"] },
  });
  res.json(post);
});

router.post("/", async (req, res) => {
  const { password } = req.body;

  bcrypt.hash(password, 10).then(async (hash) => {
    const newPost = await Posts.create({
      ...req.body,
      password: hash,
    });
    res.json(newPost);
  });
});

router.put("/update-word/:postId", async (req, res) => {
  const postId = req.params.postId;
  const { newText, newTitle } = req.body;

  await Posts.update(
    {
      postText: newText,
      title: newTitle,
    },
    {
      where: {
        id: postId,
      },
    }
  );
  res.json({ newText, newTitle });
  /*
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
          Posts.update(
            {
              postText: newText,
              title: newTitle,
            },
            {
              where: {
                id: postId,
              },
            }
          );

          res.json({ newText, newTitle });
        });
      }
    });
  } else {
    res.json({ error: " NO USER IN OUR DATABASE" });
  }
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
