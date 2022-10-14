// Update with your config settings.

const path = require('path')

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const development = {
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, "src", "database", "database.db")
  },
  pool: {
    afterCreate: (conn: any, cb: any) => conn.run("PRAGMA foreign_keys = ON", cb)
  },
  migrations: {
    directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
  },
  useNullAsDefault: true,
};

module.exports = development