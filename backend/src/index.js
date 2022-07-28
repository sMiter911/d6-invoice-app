const express = require("express");

// ADD EXTERNAL ROUTES HERE
const v1InvoiceUserRouter = require("./v1/routes/invoiceUserRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/v1/invoiceusers", v1InvoiceUserRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
