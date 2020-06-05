/**
 * Arquivo: src/config/database.js
 * Descrição: arquivo responsável por 'connectionStrings' da aplicação
 * Data: 11/05/2020
 * Author: Leticia Machado
 */
const sql = require("mssql");

const dotenv = require("dotenv");

dotenv.config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB,
  port: parseInt(process.env.DB_PORT),
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

pool.on("error", (err) => {
  console.log(err);
});

process.on("SIGINT", () =>
  pool.close((err) => {
    if (err) return console.log(err);
    console.log("pool => fechado");
    process.exit(0);
  })
);


module.exports = pool;

