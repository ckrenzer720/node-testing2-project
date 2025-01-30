/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("planets", (planets) => {
      planets.increments("planet_id");
      planets.string("planet_name", 128).notNullable();
    })
    .createTable("characters", (characters) => {
      characters.increments("character_id");
      characters.string("character_name", 128).unique().notNullable();
      characters.string("alignment").notNullable();
      characters
        .integer("planet_id")
        .unsigned()
        .notNullable()
        .references("planet_id")
        .inTable("planets")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("characters")
    .dropTableIfExists("planets");
};
