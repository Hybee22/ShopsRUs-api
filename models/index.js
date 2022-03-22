"use strict";

import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { readdirSync } from "fs";
import path, { basename as _basename, join } from "path";
import Sequelize, { DataTypes } from "sequelize";
const basename = _basename(__filename);
const env = process.env.NODE_ENV || "development";
// const config = __dirname + "/../config/config.js"[env];

import configs from "../config/config.js";
const config = configs[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const files = readdirSync(__dirname).filter(
  (file) =>
    file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
);

for await (const file of files) {
  const model = await import(`./${file}`);
  const namedModel = model.default(sequelize, DataTypes);
  db[namedModel.name] = namedModel;
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
