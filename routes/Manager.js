const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");

const { Manager } = require("../models");

const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { email, username, password } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    Manager.create({
      email,
      username,
      password: hash,
    });
    res.json("success");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const manager = await Manager.findOne({ where: { username } });

  if (!manager) {
    res.json({ error: "User doesnt exist" });
  }

  bcrypt.compare(password, manager.password).then((match) => {
    if (!match) {
      res.json({ error: "wrong username and password combination" });
    }
    const accessToken = sign(
      { username: manager.username, id: manager.id },
      "importantSecretForSecurity"
    );

    res.json({ token: accessToken, username, id: manager.id });
  });
});

router.get("/manager-id/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const manager = await Manager.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  res.json(manager);
});

module.exports = router;
