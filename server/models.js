const db = require('../database');


module.exports = {
  getQuestions: (params, callback) => {
    const string = `SELECT * from questions where product_id = ${params.product_id} AND reported = 0;`;
    db.query(string, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    })
  },

  postQuestions: (params, callback) => {
    const arr = [];
    for (var key in params) {
      arr.push(key);
    }
    const string = `INSERT INTO questions (${arr[0], arr[1], arr[2], arr[3]}) VALUES (${params.body, params.asker_name, params.asker_email, params.product_id})`;
    db.query(string, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    })
  }
}