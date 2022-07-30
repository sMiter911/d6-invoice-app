const InvoiceOrder = require("../database/InvoiceOrder");

const getInvoiceForUser = (id) => {
  try {
    return InvoiceOrder.getInvoiceForUser(id);
  } catch (error) {
    return console.error(`Server Error: ${error.message}`);
  }
};

module.exports = {
  getInvoiceForUser,
};
