/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("characters", (characters) => {
    characters.increments();
    characters.string("name", 128).unique().notNullable();
    characters.string("species").notNullable();
    characters.string("planet").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("characters");
};
