import express from "express";
import invoiceController from "../../controllers/invoices/index.js";

const router = express.Router();

// CREATE INVOICE
router.post("/", invoiceController.create);

// FETCH INVOICE BY ID
router.get("/:invoiceId", invoiceController.getById);

// FETCH CUSTOMERS' INVOICES BY ID
router.get("/customer/:customerId", invoiceController.getByCustomerId);

export default router;
