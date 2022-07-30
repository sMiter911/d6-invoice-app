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
      `CREATE TABLE invoice_users ( 
          id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
          email VARCHAR(255) NOT NULL, 
          password VARCHAR(255) NOT NULL, 
          first_name VARCHAR(255) NOT NULL, 
          last_name VARCHAR(255) NOT NULL, 
          company_name VARCHAR(255) NOT NULL, 
          phone_number VARCHAR(255) NOT NULL, 
          address VARCHAR(255) NOT NULL, 
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP 
          )`,
      (err) => {
        if (err) {
          console.error("An Error Occurred: ", err.message);
        } else {
          console.log("Invoice User Table Created");
        }
      }
    );
    DB.run(
      `CREATE TABLE invoice_orders ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
        user_id INTEGER NOT NULL, 
        order_date DATETIME DEFAULT CURRENT_TIMESTAMP, 
        invoice_number VARCHAR(255) NOT NULL, 
        due_date DATETIME, 
        notes VARCHAR(255) NOT NULL, 
        subtotal DECIMAL(10,2) NOT NULL, 
        taxable DECIMAL(10,2) NOT NULL, 
        tax DECIMAL(10,2) NOT NULL, 
        total DECIMAL(10,2) NOT NULL, 
        tax_due DECIMAL(10,2) NOT NULL 
      )`,
      (err) => {
        if (err) {
          console.error("An Error Occurred: ", err.message);
        } else {
          console.log("Invoice Orders Table Created");
        }
      }
    );
    DB.run(
      `CREATE TABLE invoice_items ( 
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, 
        order_id INTEGER NOT NULL, 
        item_code VARCHAR(255) NOT NULL, 
        item_name VARCHAR(255) NOT NULL, 
        order_item_quantity INTEGER NOT NULL, 
        order_item_price DECIMAL(8, 2) NOT NULL,
        tax_item BOOLEAN
      )`,
      (err) => {
        if (err) {
          console.error("An Error Occurred: ", err.message);
        } else {
          console.log("Invoice Items Table Created");
        }
      }
    );
  }
);

module.exports = DB;
