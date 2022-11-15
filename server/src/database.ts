import * as sqlite from "sqlite3";
const sqlite3 = sqlite.verbose();

export default class Database {
  constructor (uri: string) {
    return new sqlite3.Database(uri, (err) => {
      if (err) {
        console.error("Failed to connect to db: ", uri);
      }
      console.log("Connected to db: ", uri);
    });
  };
}

