const DB = require("../database/db");

const getAllInvoiceUsers = (req, res) => {
  try {
    DB.all("SELECT * FROM invoice_users", [], (err, data) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      return res.send({ status: "OK", data: data });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Server Error: ${error.message}`,
    });
  }
};

const getOneInvoiceUser = (req, res) => {
  const {
    params: { id },
  } = req;
  if (!id) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const sql = `SELECT * FROM invoice_users WHERE invoice_users.id = ${id}`;
    DB.all(sql, [], (err, data) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      return res.status(200).json({ data });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Server Error: ${error.message}`,
    });
  }
};

const createNewInvoiceUser = (req, res) => {
  const { body } = req;
  if (
    !body.email ||
    !body.password ||
    !body.first_name ||
    !body.last_name ||
    !body.company_name ||
    !body.phone_number ||
    !body.address
  ) {
    return res
      .status(400)
      .json({ status: "FAILED", error: "Missing required fields" });
  }
  DB.run(
    `INSERT INTO invoice_users (email, password, first_name, last_name, company_name, phone_number, address) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      body.email,
      body.password,
      body.first_name,
      body.last_name,
      body.company_name,
      body.phone_number,
      body.address,
    ],
    (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      return res
        .status(201)
        .json({ success: true, data: { message: "Invoice User Created" } });
    }
  );
};

const updateOneInvoiceUser = (req, res) => {
  const {
    body,
    params: { id },
  } = req;
  if (!id) {
    return res
      .status(400)
      .json({ status: "FAILED", error: "Missing required fields" });
  }
  try {
    const sql = `UPDATE invoice_users SET email = ?, password = ?, first_name = ?, last_name = ?, company_name = ?, phone_number = ?, address = ? WHERE invoice_users.id = ${id}`;
    DB.all(
      sql,
      [
        body.email,
        body.password,
        body.first_name,
        body.last_name,
        body.company_name,
        body.phone_number,
        body.address,
      ],
      (err) => {
        if (err) {
          res.status(400).json({ error: err.message });
          return;
        }
        return res.status(200).json({ updated: this.changes });
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Server Error: ${error.message}`,
    });
  }
};

const deleteOneInvoiceUser = (req, res) => {
  const {
    params: { id },
  } = req;
  if (!id) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const sql = `DELETE FROM invoice_users WHERE invoice_users.id = ${id}`;
    DB.all(sql, [], (err) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      return res.status(200).json({ updated: this.changes });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: `Server Error: ${error.message}`,
    });
  }
};

module.exports = {
  getAllInvoiceUsers,
  getOneInvoiceUser,
  createNewInvoiceUser,
  updateOneInvoiceUser,
  deleteOneInvoiceUser,
};
