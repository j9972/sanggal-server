const express = require("express");
const router = express.Router();

const { Comments } = require("../models");

router.get("/", async (req, res) => {
  const listOfComment = await Comments.findAll();
  res.json(listOfComment);
});

router.post("/", async (req, res) => {
  const comment = req.body;
  await Comments.create(comment);
  res.json(comment);
});

module.exports = router;
