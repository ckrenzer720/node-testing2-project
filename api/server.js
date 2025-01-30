const express = require("express");
const Character = require("./characters/characters-model");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.get("/characters", (req, res) => {
  Character.getAll()
    .then((characters) => {
      res.status(200).json(characters);
    })
    .catch((error) => {
      res.status(500).json(error.message);
    });
});

module.exports = server;
