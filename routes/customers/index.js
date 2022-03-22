import express from "express";
import customerController from "../../controllers/customers/index.js";

const router = express.Router();

// CREATE CUSTOMER
router.post("/", customerController.create);

// FETCH ALL CUSTOMERS
router.get("/all", customerController.getAll);

// FETCH CUSTOMER BY NAME
router.get("/name", customerController.getByName);

// FETCH CUSTOMER BY ID
router.get("/:customerId", customerController.getById);

export default router;
