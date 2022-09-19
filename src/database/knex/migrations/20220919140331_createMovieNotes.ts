import { Knex } from "knex";


export const up = async (knex: Knex): Promise<void> => knex.schema.createTable("movie_notes", table => {
  table.increments("id")
  table.text('title')
  table.text('description')
  table.integer('rating')
  table.integer('user_id').references('id').inTable('users')

  table.timestamp('created_at').defaultTo(knex.fn.now())
  table.timestamp('updated_at').defaultTo(knex.fn.now())
})


export const down = async (knex: Knex): Promise<void> =>
  knex.schema.dropTable("users")
