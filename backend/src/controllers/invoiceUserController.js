const invoiceUserService = require("../services/invoiceUserService");

const getAllInvoiceUsers = (req, res) => {
  const allInvoiceUsers = invoiceUserService.getAllInvoiceUsers();
  res.send("Get all invoice users");
};

const getOneInvoiceUser = (req, res) => {
  const invoiceUser = invoiceUserService.getOneInvoiceUser();
  res.send("Get an existing invoice user");
};

const createNewInvoiceUser = (req, res) => {
  const createdInvoiceUser = invoiceUserService.createNewInvoiceUser();
  res.send("Create a new invoice user");
};

const updateOneInvoiceUser = (req, res) => {
  const updatedInvoiceUser = invoiceUserService.updateOneInvoiceUser();
  res.send("Update an existing invoice user");
};

const deleteOneInvoiceUser = (req, res) => {
  invoiceUserService.deleteOneInvoiceUser();
  res.send("Delete an existing invoice user");
};

module.exports = {
  getAllInvoiceUsers,
  getOneInvoiceUser,
  createNewInvoiceUser,
  updateOneInvoiceUser,
  deleteOneInvoiceUser,
};
