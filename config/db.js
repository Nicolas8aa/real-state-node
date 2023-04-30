import Sequelize from "sequelize";

const db = new Sequelize(
  "realstate",
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    define: {
      timestamps: true,
    },
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
      aquire: 30000,
    },
    operatorsAliases: false,
  }
);

export default db;
