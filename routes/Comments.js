const express = require("express");
const router = express.Router();

const { Comments } = require("../models");

const bcrypt = require("bcryptjs");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const commentId = req.params.commentId;
  const comments = await Comments.findAll({
    where: {
      PostId: postId,
    },
    attributes: {
      exclude: ["password", "PostId", "commentId"],
    },
  });
  res.json(comments);
});

router.post("/", async (req, res) => {
  const comment = req.body;
  const newComment = await Comments.create(comment);
  res.json(newComment);
});

router.delete("/:commentId", async (req, res) => {
  const commentId = req.params.commentId;

  await Comments.destroy({
    where: {
      id: commentId,
    },
  });

  res.json("DELETE SUCCESS");
});

module.exports = router;
