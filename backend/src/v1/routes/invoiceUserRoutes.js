const express = require("express");
const invoiceUserController = require("../../controllers/invoiceUserController");
const router = express.Router();

router.get("/", invoiceUserController.getAllInvoiceUsers);

router.get("/:id", invoiceUserController.getOneInvoiceUser);

router.post("/", invoiceUserController.createNewInvoiceUser);

router.patch("/:id", invoiceUserController.updateOneInvoiceUser);

router.delete("/:id", invoiceUserController.deleteOneInvoiceUser);

module.exports = router;
