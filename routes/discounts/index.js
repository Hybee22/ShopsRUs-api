import express from "express";
import discountController from "../../controllers/discounts/index.js";

const router = express.Router();

// CREATE DISCOUNT
router.post("/", discountController.create);

// FETCH ALL DISCOUNTS
router.get("/all", discountController.getAll);

// FETCH DISCOUNT BY TYPE
router.get("/", discountController.getByType);

export default router;
