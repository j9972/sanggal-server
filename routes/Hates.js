const express = require("express");
const router = express.Router();

const { Hates } = require("../models");

router.post("/", async (req, res) => {
  const { PostId } = req.body;

  const found = await Hates.findOne({ where: { PostId } });
  if (!found) {
    await Hates.create({
      PostId,
    });
    res.json({ hated: true });
  }
});

module.exports = router;
