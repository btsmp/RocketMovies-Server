import { Knex } from "knex";


export const up = async (knex: Knex): Promise<void> => knex.schema.createTable("users", table => {
  table.uuid("id").primary()
  table.text('name')
  table.text('email')
  table.text('password')
  table.text('avatar')
  table.boolean('google_user')

  table.timestamp('created_at').defaultTo(knex.fn.now())
  table.timestamp('updated_at').defaultTo(knex.fn.now())

})


export const down = async (knex: Knex): Promise<void> => knex.schema.dropTable("users")
