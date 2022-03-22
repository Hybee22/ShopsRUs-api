import express from "express";
import customerController from "../../controllers/customers/index.js";

const router = express.Router();

// CREATE CUSTOMER
router.post("/", customerController.create);

// FETCH ALL CUSTOMERS
router.get("/", customerController.getAll);

// FETCH CUSTOMER BY ID
router.get("/:customerId", customerController.getById);

// FETCH CUSTOMER BY NAME
router.get("/", customerController.getByName);

export default router;
