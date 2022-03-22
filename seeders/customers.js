import { v4 } from "uuid";
import moment from "moment";
import chalk from "chalk";
import models from "../models/index.js";

const customersArr = [
  {
    name: "John Smith",
    type: "affiliate",
    dateJoined: moment("03-25-2021", "MM-DD-YYYY").format(),
  },
  {
    name: "Hayley Jones",
    type: "employee",
    dateJoined: moment("01-03-2019", "MM-DD-YYYY").format(),
  },
  {
    name: "Richie Clark",
    type: "affiliate",
    dateJoined: moment("10-01-2020", "MM-DD-YYYY").format(),
  },
];

const customerSeeder = async () => {
  const customerExist = await models.Customer.findOne({
    where: { name: customersArr[0].name },
  });
  if (customerExist) {
    const customerInit = chalk.green("[✔] Customers already seeded...");
    console.log(customerInit);
    return;
  }

  const customerInit = chalk.yellowBright("[!] Initializing Seed Customers!");
  console.log(customerInit);

  const customersWithId = customersArr.map((customer) => {
    return {
      ...customer,
      customerId: v4(),
    };
  });

  const customersCreated = await models.Customer.bulkCreate(customersWithId);
  if (customersCreated) {
    const log = chalk.green("[✔] Customers seeded successfully");
    console.log(log);
  }
};

export default customerSeeder;
