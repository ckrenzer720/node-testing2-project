const db = require("../../data/db-config");

function getAll() {
  return db("characters");
}

module.exports = { getAll };
