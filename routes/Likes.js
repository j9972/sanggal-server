const express = require("express");
const router = express.Router();

const { Likes, Posts } = require("../models");

router.post("/", async (req, res) => {
  // Like에 데이터 들어오는거 보니까 postId만 같게 나오면 될거같음.
  try {
    const like = req.body;
    const newLike = await Likes.create(like);

    res.json(newLike);
  } catch (err) {
    res.json({ msg: err });
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
