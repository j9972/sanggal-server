const express = require("express");
const router = express.Router();

const { Comments } = require("../models");

router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  console.log("postId:", postId);
  const comments = await Comments.findAll({
    where: {
      PostId: postId,
    },
  });
  res.json(comments);
});

router.post("/", async (req, res) => {
  console.log("req.body: ", req.body);
  const comment = req.body;
  await Comments.create(comment);
  res.json(comment);
});

module.exports = router;
