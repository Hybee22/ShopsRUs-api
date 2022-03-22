import discountService from "../../services/discount-service.js";
import { successResMsg, errorResMsg } from "../../utilities/response.js";
import Logger from "../../logger.js";

const logger = Logger;

class DiscountController {
  async create(req, res) {
    try {
      const { type, value } = req.body;
      const dataToCreate = {
        value,
        type,
      };
      const resp = await discountService.createDiscount(dataToCreate);
      return successResMsg(res, 201, {
        message: "New discount type added successfully",
        data: resp,
      });
    } catch (error) {
      logger.error(error);
      return errorResMsg(res, 500, {
        message: "Something went wrong while adding new discount type",
      });
    }
  }

  async getAll(req, res) {
    try {
      const resp = await discountService.getDiscounts();

      return successResMsg(res, 200, {
        message: "Discounts fetched successfully",
        data: resp,
      });
    } catch (error) {
      logger.error(error);
      return errorResMsg(res, 500, {
        message: "Something went wrong while fetching discounts' data",
      });
    }
  }

  async getByType(req, res) {
    try {
      const { type } = req.query;
      const resp = await discountService.getDiscountByType({ type });

      if (!resp) {
        return errorResMsg(res, 404, { message: "Discount data not found" });
      }

      return successResMsg(res, 200, {
        message: "Discount fetched successfully",
        data: resp,
      });
    } catch (error) {
      logger.error(error);
      return errorResMsg(res, 500, {
        message: "Something went wrong while fetching discount data",
      });
    }
  }
}

export default new DiscountController();
