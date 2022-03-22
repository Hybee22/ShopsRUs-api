import dotenv from "dotenv";
dotenv.config();

const development = {
  username: process.env.SHOPSRUS_DB_USER,
  password: process.env.SHOPSRUS_DB_PASSWORD,
  database: process.env.SHOPSRUS_DB_NAME,
  host: process.env.SHOPSRUS_DB_HOST,
  port: process.env.SHOPSRUS_DB_PORT,
  dialect: process.env.SHOPSRUS_DB_DIALECT,
  logging: false,
};

const production = {
  username: process.env.SHOPSRUS_DB_USER,
  password: process.env.SHOPSRUS_DB_PASSWORD,
  database: process.env.SHOPSRUS_DB_NAME,
  host: process.env.SHOPSRUS_DB_HOST,
  port: process.env.SHOPSRUS_DB_PORT,
  dialect: process.env.SHOPSRUS_DB_DIALECT,
  logging: false,
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // This line will fix new error
    },
  },
  use_env_variable: "DATABASE_URL",
};

export default { development, production };
