import moment from "moment";
import { v4 } from "uuid";
import invoiceService from "../../services/invoice-service.js";
import customerService from "../../services/customer-service.js";
import { successResMsg, errorResMsg } from "../../utilities/response.js";
import Logger from "../../logger.js";

const logger = Logger;

class InvoiceController {
  async create(req, res) {
    try {
      let legacy,
        discountType = "";
      const { customerId, description } = req.body;

      const customerRes = await customerService.isAffliateOrEmployee({
        customerId,
      });

      if (!customerRes) {
        return errorResMsg(res, 404, { message: "Customer not found" });
      }

      if (customerRes.type === "affiliate" || customerRes.type === "employee") {
        discountType = customerRes.type;
      }

      let dateDiff = moment().diff(
        moment(customerRes.dateJoined, "DD-MM-YYYY"),
        "years"
      );

      if (dateDiff >= 2) discountType === "legacy";

      discountType === "legacy" && dateDiff >= 2
        ? (legacy = true)
        : (legacy = false);

      const resp = await invoiceService.getTotal(description, {
        type: discountType,
        legacy,
      });

      // Save Invoice Data
      const dataToSave = {
        customerId,
        invoiceId: v4(),
        description: JSON.stringify(description),
        amount: resp,
        CustomerCustomerId: customerId,
      };

      const invoiceExists = await invoiceService.getInvoiceByDesc({
        description: JSON.stringify(description),
      });

      if (invoiceExists && invoiceExists.customerId === customerId) {
        return errorResMsg(res, 400, {
          message: "An invoice already created for this bill",
        });
      }

      await invoiceService.createInvoice(dataToSave);

      return successResMsg(res, 200, {
        InvoiceTotal: resp,
      });
    } catch (error) {
      logger.error(error);
      return errorResMsg(res, 500, {
        message: "Something went wrong while calculating invoice total",
      });
    }
  }
}

export default new InvoiceController();
