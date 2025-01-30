/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("characters").truncate();
  await knex("characters").insert([
    {
      id: 1,
      name: "Luke Skywalker",
      species: "Human",
      planet: "Tatooine",
    },
    {
      id: 2,
      name: "Chewbacca",
      species: "Wookie",
      planet: "Kamino",
    },
    {
      id: 3,
      name: "Boba Fett",
      species: "Clone",
      planet: "Kashyyyk",
    },
  ]);
};
