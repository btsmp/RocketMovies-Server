// Update with your config settings.


/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

export const development = {
  client: 'sqlite3',
  connection: {
    filename: './src/database/database.db'
  },
  pool: {
    afterCreate: (conn: any, cb: any) => conn.run("PRAGMA foreign_keys = ON", cb)
  },
  migrations: {
    directory: './src/database/knex/migrations'
  },
  useNullAsDefault: true,
};