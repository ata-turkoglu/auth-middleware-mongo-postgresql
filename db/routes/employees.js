const client = require("../db");

const getAll = (request, response) => {
  client.query("SELECT * FROM employees", (err, result) => {
    if (!err) {
      response.status(200).json(result);
    } else {
      console.error(err);
      response.status(500).json({ err });
    }
  });
};

module.exports = { getAll };
