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

module.exports = router;
