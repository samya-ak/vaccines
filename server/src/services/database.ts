import * as sqlite from "sqlite3";
const sqlite3 = sqlite.verbose();

export default class Database {
  db: sqlite.Database;

  constructor(uri: string) {
    this.db = new sqlite3.Database(uri, (err) => {
      if (err) {
        console.error("Failed to connect to db: ", uri);
        return;
      }
      console.log("Connected to db: ", uri);
    });

    const dropUsersTable = "DROP TABLE IF EXISTS users";
    this.db.run(dropUsersTable);

    const createUsersTable =
      "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT,email TEXT NOT NULL UNIQUE, password TEXT NOT NULL)";
    this.db.run(createUsersTable);
  }

  run(stmt: string, params: any[]) {
    return new Promise((res, rej) => {
      this.db.run(stmt, params, (error: any, result: any) => {
        if (error) {
          console.error(error);
          return rej(error.message);
        }
        return res(result);
      });
    });
  }

  get(stmt: string, params: any[]) {
    return new Promise((res, rej) => {
      this.db.get(stmt, params, (error, result) => {
        if (error) {
          return rej(error.message);
        }
        return res(result);
      });
    });
  }
}
