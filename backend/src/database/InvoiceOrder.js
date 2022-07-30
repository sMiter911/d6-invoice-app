const DB = require("../database/db");

const getInvoiceForUser = (id) => {
  try {
    return new Promise(async (resolve, reject) => {
      DB.all(
        `SELECT * FROM invoice_orders WHERE invoice_orders.user_id = ${id}`,
        [],
        (err, data) => {
          if (err) {
            reject(err);
          }
          resolve(data);
        }
      );
    }).then((data) => {
      return data;
    });
  } catch (error) {
    return console.error(`Server Error: ${error.message}`);
  }
};

module.exports = {
  getInvoiceForUser,
};
