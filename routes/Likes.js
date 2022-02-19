const express = require("express");
const router = express.Router();

const { Likes } = require("../models");

router.post("/", async (req, res) => {
  const { PostId } = req.body;

  const found = await Likes.findOne({ where: { PostId } });
  if (!found) {
    await Likes.create({
      PostId,
    });
    res.json({ liked: true });
  }
});

// 게시물마다의 좋아요 get방식으로 보여주기 -> postid 기준으로 추천 버튼 누름을 보여줌
router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const likes = await Likes.findAll({
    where: {
      PostId: postId,
    },
  });
  res.json(likes);
});

module.exports = router;
