const db = require("../data/db-config");

function getAll() {
  return db("characters");
}

async function insertCharacter(character) {
  const [id] = await db("characters").insert(character);
  return db("characters").where("id", id).first(); // Fetch inserted row
}

async function deleteCharacter(id) {
  return db("characters").where("id", id).del();
}
module.exports = { getAll, insertCharacter, deleteCharacter };
