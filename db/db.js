const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  posrt: 5432,
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.POSTGRESQL_DATABASE,
});

client.connect();

module.exports = client;
