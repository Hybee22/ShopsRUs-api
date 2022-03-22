import models from "../models/index.js";
const { Customer } = models;

class CustomerService {
  async createCustomer(data) {
    const customerRes = await Customer.create({
      ...data,
    });

    return customerRes;
  }

  async getCustomers() {
    const customerRes = await Customer.findAll({
      attributes: ["customerId", "name", "type", "dateJoined"],
    });

    return customerRes;
  }

  async getCustomerById(data) {
    const { customerId } = data;
    const customerRes = await Customer.findOne({
      where: { customerId },
      attributes: ["customerId", "name", "type", "dateJoined"],
    });

    return customerRes;
  }

  async getCustomerByName(data) {
    const { name } = data;
    const lookup = name.toLowerCase();
    const customerRes = await Customer.findOne({
      where: {
        name: Sequelize.where(
          Sequelize.fn("LOWER", Sequelize.col("name")),
          "LIKE",
          "%" + lookup + "%"
        ),
      },
    });
    return customerRes;
  }

  async isAffliateOrEmployee(data) {
    const { customerId } = data;
    const customerRes = await Customer.findOne({
      where: { customerId },
    });

    if (!customerRes) {
      return null;
    }

    if (customerRes.type === "affiliate") {
      return {
        type: "affiliate",
        dateJoined: customerRes.dateJoined,
      };
    }
    if (customerRes.type === "employee") {
      return {
        type: "employee",
        dateJoined: customerRes.dateJoined,
      };
    }
  }
}

export default new CustomerService();
