const DB = require("../database/db");
const InvoiceUsers = require("./invoiceUserController");

const getInvoiceForUser = (req, res) => {
  const {
    params: { id },
  } = req;
  if (!id) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const sql = `SELECT * FROM invoice_orders WHERE invoice_orders.user_id = ${id}`;
    DB.all(sql, [], (err, data) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      return res.status(200).send({ status: "OK", data: data });
    });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const addInvoice = (req, res) => {
  const { body } = req;
  if (
    !body.due_date ||
    !body.invoice_number ||
    !body.order_date ||
    !body.subtotal ||
    !body.tax ||
    !body.total ||
    !body.tax_due ||
    !body.taxable ||
    !body.user_id
  ) {
    return res
      .status(400)
      .json({ status: "FAILED", error: "Missing required fields" });
  }
  DB.run(
    `INSERT INTO invoice_orders (
      due_date, 
      invoice_number, 
      notes, 
      order_date, 
      subtotal, 
      tax, 
      total, 
      tax_due, 
      taxable, 
      user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? )`,
    [
      body.due_date,
      body.invoice_number,
      body.notes,
      body.order_date,
      body.subtotal,
      body.tax,
      body.total,
      body.tax_due,
      body.taxable,
      body.user_id,
    ],
    (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      return res
        .status(201)
        .json({ success: true, data: { message: "Invoice  Created" } });
    }
  );
};

module.exports = {
  getInvoiceForUser,
  addInvoice,
};
