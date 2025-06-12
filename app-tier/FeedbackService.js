const dbcreds = require('./DbConfig');
const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10,
  host: dbcreds.DB_HOST,
  user: dbcreds.DB_USER,
  password: dbcreds.DB_PWD,
  database: dbcreds.DB_DATABASE
});

// Add feedback
function addFeedback(name, message, callback) {
  const sql = "INSERT INTO feedback (name, message) VALUES (?, ?)";
  pool.query(sql, [name, message], (err, result) => {
    callback(err, result);
  });
}

function getAllFeedback(callback) {
  const sql = "SELECT * FROM feedback";
  pool.query(sql, (err, results) => {
    callback(err, results);  // send both err and results
  });
}


function deleteAllFeedback(callback) {
  const sql = "DELETE FROM feedback";
  pool.query(sql, (err, result) => {
    callback(err, result); // return error
  });
}

module.exports = {
  addFeedback,
  getAllFeedback,
  deleteAllFeedback
};
