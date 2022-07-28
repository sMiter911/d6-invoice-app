const sqlite3 = require("sqlite3").verbose();
const DB_SOURCE = "d6_invoicing.db";

let DB = new sqlite3.Database(
  DB_SOURCE,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the database.");
    DB.run(
      "CREATE TABLE invoice_users ( \
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, \
          email VARCHAR(255) NOT NULL, \
          password VARCHAR(255) NOT NULL, \
          first_name VARCHAR(255) NOT NULL, \
          last_name VARCHAR(255) NOT NULL, \
          company_name VARCHAR(255) NOT NULL, \
          phone_number VARCHAR(255) NOT NULL, \
          address VARCHAR(255) NOT NULL, \
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP, \
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP \
          )",
      (err) => {
        if (err) {
          console.error("Invoice User Already exists: ", err.message);
        } else {
          console.log("Invoice User Table Created");
        }
      }
    );
  }
);

module.exports = DB;
