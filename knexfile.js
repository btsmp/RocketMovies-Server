"use strict";
// Update with your config settings.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.development = void 0;
const path_1 = __importDefault(require("path"));
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
exports.development = {
    client: 'sqlite3',
    connection: {
        filename: path_1.default.resolve(__dirname, "src", "database", "database.db")
    },
    pool: {
        afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
    },
    migrations: {
        directory: path_1.default.resolve(__dirname, "src", "database", "knex", "migrations")
    },
    useNullAsDefault: true,
};
//# sourceMappingURL=knexfile.js.map