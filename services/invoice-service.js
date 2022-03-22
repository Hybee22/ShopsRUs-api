import models from "../models/index.js";
import discountService from "./discount-service.js";

const { Invoice } = models;

class InvoiceService {
  async createInvoice(data) {
    const invoiceRes = await Invoice.create({
      ...data,
    });

    return invoiceRes;
  }

  async getInvoiceById(data) {
    const { invoiceId } = data;
    const invoiceRes = await Invoice.findOne({
      where: { invoiceId },
      attributes: ["customerId", "invoiceId", "description", "amount"],
    });

    return invoiceRes;
  }

  async getInvoiceByCustomerId(data) {
    const { customerId } = data;
    const invoiceRes = await Invoice.findAll({
      where: { customerId },
      attributes: ["customerId", "invoiceId", "description", "amount"],
    });

    return invoiceRes;
  }

  async getInvoiceByDesc(data) {
    const { description } = data;
    const invoiceRes = await Invoice.findOne({
      where: { description },
      attributes: ["customerId", "invoiceId", "description", "amount"],
    });

    return invoiceRes;
  }

  async getTotal(data, userType) {
    let desc = data;
    const PBD = await this.calculatePercentageDiscounts(userType);
    let totalInvoice = 0;
    let totalInvoiceWithDeductions = 0;
    let totalGroceriesAmount = 0;
    let totalAmountForOtherItems = 0;
    const totalCalc = desc.map((invoice) => {
      const type = invoice?.type?.toLowerCase();
      if (type === "groceries") {
        invoice.items.forEach((item) => {
          totalGroceriesAmount += item.unitPrice * item.quantity;
        });
      }

      if (type !== "groceries") {
        invoice.items.forEach((item) => {
          totalAmountForOtherItems += item.unitPrice * item.quantity;
        });
      }

      return {
        groceries: totalGroceriesAmount,
        otherItems: totalAmountForOtherItems,
      };
    });

    console.log(totalCalc);

    // No Groceries
    if (totalGroceriesAmount === 0) {
      totalInvoice = totalCalc[0]?.groceries + totalCalc[0]?.otherItems;

      totalInvoiceWithDeductions =
        totalCalc[0]?.groceries +
        (totalCalc[0]?.otherItems - totalCalc[0]?.otherItems * PBD);
      return {
        totalInvoice,
        percentageBasedDiscount: totalCalc[0]?.otherItems * PBD,
        discountPerHundred: this.discountPerHundred(totalInvoiceWithDeductions),
        totalPayable:
          totalInvoiceWithDeductions -
          this.discountPerHundred(totalInvoiceWithDeductions),
      };
    }

    // With Groceries
    totalInvoice = totalCalc[1]?.groceries + totalCalc[1]?.otherItems;

    totalInvoiceWithDeductions =
      totalCalc[1]?.groceries +
      (totalCalc[1]?.otherItems - totalCalc[1]?.otherItems * PBD);
    // return totalInvoice - this.discountPerHundred(totalInvoice);
    return {
      totalInvoice,
      percentageBasedDiscount: totalCalc[1]?.otherItems * PBD,
      discountPerHundred: this.discountPerHundred(totalInvoiceWithDeductions),
      totalPayable:
        totalInvoiceWithDeductions -
        this.discountPerHundred(totalInvoiceWithDeductions),
    };
  }

  async calculatePercentageDiscounts(data) {
    const { type, legacy } = data;
    const discountRes = await discountService.getDiscountByType({ type });
    let discount = 0;

    if (legacy && discountRes.type === "legacy") {
      discount = discountRes.value / 100;
      return discount;
    }
    if (!legacy && discountRes.type === "affiliate") {
      discount = discountRes.value / 100;
      return discount;
    }
    if (!legacy && discountRes.type === "employee") {
      discount = discountRes.value / 100;
      return discount;
    }
  }

  discountPerHundred(amount) {
    return Math.floor(amount / 100) * 5;
  }
}

export default new InvoiceService();
