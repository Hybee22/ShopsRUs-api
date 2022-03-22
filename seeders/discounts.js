import chalk from "chalk";
import models from "../models/index.js";

const discountsArr = [
  { type: "legacy", value: 5 },
  { type: "affiliate", value: 10 },
  { type: "employee", value: 30 },
];

const discountSeeder = async () => {
  const discountExist = await models.Discount.findOne({
    where: { type: discountsArr[0].type },
  });
  if (discountExist) {
    const discountInit = chalk.green("[✔] Discounts already seeded...");
    console.log(discountInit);
    return;
  }

  const discountInit = chalk.yellowBright("[!] Initializing Seed Discounts!");
  console.log(discountInit);

  const discountsCreated = await models.Discount.bulkCreate(discountsArr);
  if (discountsCreated) {
    const log = chalk.green("[✔] Discounts seeded successfully");
    console.log(log);
  }
};

export default discountSeeder;
