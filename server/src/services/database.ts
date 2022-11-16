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

    this.buildSchema();
  }

  buildSchema() {
    const dropUsersTable = "DROP TABLE IF EXISTS users";
    const dropVaccinesTable = "DROP TABLE IF EXISTS vaccines";
    const dropAllergiesTable = "DROP TABLE IF EXISTS allergies";
    const dropVaccineAllergiesTable = "DROP TABLE IF EXISTS vaccines_allergies";

    const createUsersTable = `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL UNIQUE, 
        password TEXT NOT NULL)`;

    const vaccinesTable = `CREATE TABLE IF NOT EXISTS vaccines (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description VARCHAR NOT NULL,
        number_of_doses INT NOT NULL,
        user_id INTEGER NOT NULL, 
        mandatory BOOL DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users (id))`;

    const allergiesTable = `CREATE TABLE IF NOT EXISTS allergies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description VARCHAR)`;

    const vaccineAllergyTable = `CREATE TABLE IF NOT EXISTS vaccines_allergies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      vaccine_id INTEGER NOT NULL,
      allergy_id INTEGER NOT NULL,
      FOREIGN KEY (vaccine_id) REFERENCES vaccines (id),
      FOREIGN KEY (allergy_id) REFERENCES allergies (id))`;

    this.db.serialize(() => {
      // this.db.run(dropUsersTable);
      // this.db.run(dropAllergiesTable);
      // this.db.run(dropVaccinesTable);
      // this.db.run(dropVaccineAllergiesTable);

      this.db.run(createUsersTable);
      this.db.run(vaccinesTable);
      this.db.run(allergiesTable);
      this.db.run(vaccineAllergyTable);
    });
  }

  run(stmt: string, params: any[]) {
    return new Promise((res, rej) => {
      this.db.run(stmt, params, async (error: any, result: any) => {
        if (error) {
          console.error(error);
          return rej(error.message);
        }

        return res(this.get("SELECT last_insert_rowid() as id", []));
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

  all(stmt: string, params: any[]) {
    return new Promise((res, rej) => {
      this.db.all(stmt, params, (error, result) => {
        if (error) {
          return rej(error.message);
        }
        return res(result);
      });
    });
  }
}
