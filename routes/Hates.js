const express = require("express");
const router = express.Router();

const { Hates } = require("../models");

router.post("/", async (req, res) => {
  //const { PostId } = req.body;

  try {
    // const found = await Hates.findOne({ where: { PostId } });
    // if (!found) {
    //   await Hates.create({
    //     PostId,
    //   });
    //   res.json({ hated: true });
    // }
    const hate = req.body;
    const newHate = await Hates.create(hate);
    res.json(newHate);
  } catch (err) {
    res.json({ msg: err });
  }
});

// 게시물마다의 싫어요 get방식으로 보여주기 -> postid 기준으로 비추 버튼 누름을 보여줌
router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const hates = await Hates.findAll({
    where: {
      PostId: postId,
    },
  });
  res.json(hates);
});

module.exports = router;
