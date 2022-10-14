import { Knex } from "knex";


export const up = async (knex: Knex): Promise<void> => knex.schema.createTable("tags", table => {
  table.increments('id')
  table.text('name')
  table.text('note_id').references('id').inTable('movie_notes').onDelete("CASCADE")
  table.text('user_id').references('id').inTable('users')
})

export const down = async (knex: Knex): Promise<void> => knex.schema.dropTable("tags")
