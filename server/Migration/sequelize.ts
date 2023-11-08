import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.MARIADB_DATABASE!,
  process.env.MARIADB_USER!,
  process.env.MARIADB_PASSWORD,
  {
    host: "mariadb",
    dialect: "mariadb",
  }
);

export default sequelize;
