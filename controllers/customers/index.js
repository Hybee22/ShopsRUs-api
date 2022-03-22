import { v4 } from "uuid";
import moment from "moment";
import customerService from "../../services/customer-service.js";
import { successResMsg, errorResMsg } from "../../utilities/response.js";
import Logger from "../../logger.js";

const logger = Logger;

class CustomerController {
  async create(req, res) {
    try {
      const { name, type, dateJoined } = req.body;

      if (!name || !type || !dateJoined) {
        return errorResMsg(res, 400, {
          message: "Name, type and date joined are required",
        });
      }

      const customerId = v4();
      const dataToCreate = {
        name,
        type,
        dateJoined: moment(dateJoined, "MM-DD-YYYY").format(),
        customerId,
      };
      const resp = await customerService.createCustomer(dataToCreate);
      return successResMsg(res, 201, {
        message: "Customer created successfully",
        data: resp,
      });
    } catch (error) {
      logger.error(error);
      return errorResMsg(res, 500, {
        message: "Something went wrong while creating customer",
      });
    }
  }

  async getAll(req, res) {
    try {
      const resp = await customerService.getCustomers();

      return successResMsg(res, 200, {
        message: "Customers fetched successfully",
        data: resp,
      });
    } catch (error) {
      logger.error(error);
      return errorResMsg(res, 500, {
        message: "Something went wrong while fetching customers' data",
      });
    }
  }

  async getById(req, res) {
    try {
      const { customerId } = req.params;
      const resp = await customerService.getCustomerById({ customerId });

      if (!resp) {
        return errorResMsg(res, 404, { message: "Customer not found" });
      }

      return successResMsg(res, 200, {
        message: "Customer fetched successfully",
        data: resp,
      });
    } catch (error) {
      logger.error(error);
      return errorResMsg(res, 500, {
        message: "Something went wrong while fetching customer data",
      });
    }
  }

  async getByName(req, res) {
    try {
      const { name } = req.query;

      if (name === "") {
        return errorResMsg(res, 400, {
          message: "Please add a name to your query",
        });
      }

      const resp = await customerService.getCustomerByName({ name });

      if (!resp) {
        return errorResMsg(res, 404, { message: "Customer not found" });
      }

      return successResMsg(res, 200, {
        message: "Customer fetched successfully",
        data: resp,
      });
    } catch (error) {
      logger.error(error);
      return errorResMsg(res, 500, {
        message: "Something went wrong while fetching customer data",
      });
    }
  }
}

export default new CustomerController();
