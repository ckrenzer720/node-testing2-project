/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("characters").truncate();
  await knex("planets").truncate();
  await knex("planets").insert([
    { planet_id: 1, planet_name: "Tatooine" },
    { planet_id: 2, planet_name: "Kamino" },
    { planet_id: 3, planet_name: "Naboo" },
  ]);
  await knex("characters").insert([
    {
      character_id: 1,
      character_name: "Luke Skywalker",
      alignment: "Jedi",
      planet_id: 1,
    },
    {
      character_id: 2,
      character_name: "Darth Sidious",
      alignment: "Sith",
      planet_id: 3,
    },
    {
      character_id: 3,
      character_name: "Boba Fett",
      alignment: "Bounty Hunter",
      planet_id: 2,
    },
  ]);
};
