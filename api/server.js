const express = require("express");
const Character = require("./characters-model");

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

server.post("/characters", async (req, res) => {
  try {
    const newCharacter = await Character.insertCharacter(req.body);
    res.status(201).json(newCharacter);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error inserting character", error: err.message });
  }
});

server.delete("/characters/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Character.deleteCharacter(id);

    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: "Character not found" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting character", error: err.message });
  }
});

module.exports = server;
