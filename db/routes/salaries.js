const client = require("../db");

const getAll = (request, response) => {
  client.query("SELECT * FROM salaries ORDER BY salary DESC", (err, result) => {
    if (!err) {
      response.status(200).json(result.rows);
    } else {
      console.log(err);
      response.status(500).json(err);
    }
  });
};

module.exports = { getAll };
