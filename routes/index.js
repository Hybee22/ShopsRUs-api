import customersRouter from "./customers/index.js";
import discountsRouter from "./discounts/index.js";
import invoiceRouter from "./invoices/index.js";

export default (app) => {
  app.use("/v1/customers", customersRouter);
  app.use("/v1/discounts", discountsRouter);
  app.use("/v1/invoice", invoiceRouter);
};
