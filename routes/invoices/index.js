import express from "express";
import invoiceController from "../../controllers/invoices/index.js";

const router = express.Router();

// CREATE DISCOUNT
router.post("/", invoiceController.create);

export default router;
