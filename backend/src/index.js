const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// ADD EXTERNAL ROUTES HERE
const v1InvoiceUserRouter = require("./v1/routes/invoiceUserRoutes");

const app = express();
const corsOption = {
  origin: "http://localhost:5000",
};
app.use(cors(corsOption));
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use("/api/v1/invoiceusers", v1InvoiceUserRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
