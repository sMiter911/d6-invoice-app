const express = require("express");
const invoiceUserController = require("../../controllers/invoiceUserController");
const invoiceOrderController = require("../../controllers/invoiceOrderController");
const invoiceItemController = require("../../controllers/invoiceItemController");
const router = express.Router();

router.get("/", invoiceUserController.getAllInvoiceUsers);

router.get("/items", invoiceItemController.getAllInvoiceItems);

router.get("/:id", invoiceUserController.getOneInvoiceUser);

router.get("/:id/orders", invoiceOrderController.getInvoiceForUser);

router.get("/:id/items", invoiceItemController.getItemsForInvoice);

router.post("/", invoiceUserController.createNewInvoiceUser);

router.post("/addinvoice", invoiceOrderController.addInvoice);

router.post("/additem", invoiceItemController.addInvoiceItem);

router.patch("/:id", invoiceUserController.updateOneInvoiceUser);

router.delete("/:id", invoiceUserController.deleteOneInvoiceUser);

module.exports = router;
