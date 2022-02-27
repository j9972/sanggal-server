const express = require("express");
const router = express.Router();

const { Comments } = require("../models");

const bcrypt = require("bcryptjs");
console.log("hi");
router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({
    where: {
      PostId: postId,
    },
    attributes: {
      exclude: ["password", "PostId"],
    },
  });
  res.json(comments);
});

router.post("/", async (req, res) => {
  const { password } = req.body;

  bcrypt.hash(password, 10).then(async (hash) => {
    const newComment = await Comments.create({
      ...req.body,
      password: hash,
    });
    res.json(newComment);
  });
});

router.delete("/:commentId", async (req, res) => {
  const commentId = req.params.commentId;
  const { newPassword } = req.body;

  const findComment = await Comments.findOne({
    where: {
      id: commentId,
    },
  });
  console.log("newPassword:", newPassword, "user:", findComment.password);
  if (findComment) {
    bcrypt.compare(newPassword, findComment.password).then(async (match) => {
      if (!match) {
        res.json({ error: "wrong password entered" });
      } else {
        bcrypt.hash(newPassword, 10).then((hash) => {
          Comments.destroy({
            where: {
              id: commentId,
            },
          });

          res.json("DELETE SUCCESS");
        });
      }
    });
  } else {
    res.json({ error: " NO COMMENT IN OUR DATABASE" });
  }
});

module.exports = router;
