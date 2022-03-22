import models from "../models/index.js";
const { Discount, Sequelize } = models;

class DiscountService {
  async createDiscount(data) {
    const discountRes = await Discount.create({
      ...data,
    });

    return discountRes;
  }

  async getDiscounts() {
    const discountRes = await Discount.findAll({
      attributes: ["id", "type", "value"],
    });

    return discountRes;
  }

  async getDiscountByType(data) {
    const { type } = data;
    const lookup = type.toLowerCase();
    const discountRes = await Discount.findOne({
      where: {
        type: Sequelize.where(
          Sequelize.fn("LOWER", Sequelize.col("type")),
          "LIKE",
          "%" + lookup + "%"
        ),
      },
    });
    return discountRes;
  }
}

export default new DiscountService();
