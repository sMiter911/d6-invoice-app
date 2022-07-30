const DB = require("../database/db");

const getAllInvoiceItems = async (req, res) => {
  try {
    const sql = `SELECT * FROM invoice_items`;
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

const getItemsForInvoice = async (req, res) => {
  const {
    params: { id },
  } = req;
  if (!id) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const sql = `SELECT * FROM invoice_items WHERE invoice_items.order_id = ${id}`;
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

const addInvoiceItem = (req, res) => {
  const { body } = req;
  if (
    !body.order_id ||
    !body.item_code ||
    !body.item_name ||
    !body.order_item_quantity ||
    !body.order_item_price
  ) {
    return res
      .status(400)
      .json({ status: "FAILED", error: "Missing required fields" });
  }
  DB.run(
    `INSERT INTO invoice_items (
      order_id, 
      item_code, 
      item_name, 
      order_item_quantity, 
      order_item_price) VALUES (?, ?, ?, ?, ?)`,
    [
      body.order_id,
      body.item_code,
      body.item_name,
      body.order_item_quantity,
      body.order_item_price,
    ],
    (err, data) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      return res
        .status(201)
        .json({ success: true, data: { message: "Invoice item Created" } });
    }
  );
};

const deleteinvoiceItem = (req, res) => {
  return;
};

module.exports = {
  addInvoiceItem,
  deleteinvoiceItem,
  getItemsForInvoice,
  getAllInvoiceItems,
};
