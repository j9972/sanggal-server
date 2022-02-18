const express = require("express");
const router = express.Router();

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
    attributes: { exclude: ["password"] },
  });
  res.json(post);
});

router.post("/", async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.json(post);
});

module.exports = router;
