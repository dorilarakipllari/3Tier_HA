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
function addFeedback(name, message) {
  const sql = "INSERT INTO feedback (name, message) VALUES (?, ?)";
  pool.query(sql, [name, message], (err) => {
    if (err) throw err;
    console.log("Feedback added.");
  });
}

// Get all feedback
function getAllFeedback(callback) {
  const sql = "SELECT * FROM feedback";
  pool.query(sql, (err, results) => {
    if (err) throw err;
    callback(results);
  });
}

// Delete all feedback
function deleteAllFeedback(callback) {
  const sql = "DELETE FROM feedback";
  pool.query(sql, (err, result) => {
    if (err) throw err;
    callback(result);
  });
}

module.exports = {
  addFeedback,
  getAllFeedback,
  deleteAllFeedback
};
