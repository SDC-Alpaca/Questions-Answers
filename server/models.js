const db = require('../database');


module.exports = {
  getQuestions: (params, callback) => {
    const string = `SELECT questions.id, questions.product_id, questions.body, questions.date_written, questions.asker_name, questions.asker_email, questions.reported, questions.helpful, answers.id AS answer_id, answers.questions_id, answers.body AS answer_body, answers.date_written AS answer_date_written, answers.answerer_name, answers.answerer_email, answers.reported AS answer_reported, answers.helpful AS answer_helpful from questions INNER JOIN answers ON questions.id = answers.questions_id where product_id = ${params.product_id} AND questions.reported = 0 AND answers.reported = 0;`;
    db.query(string, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        console.log(data)
        callback(null, data);
      }
    })
  },

  addQuestions: (params, callback) => {
    let arr = [];
    for (var key in params) {
      arr.push(key);
    }

    const string = `INSERT INTO questions (${arr[0]}, ${arr[1]}, ${arr[2]}, ${arr[3]}) VALUES ('${params.body}', '${params.asker_name}', '${params.asker_email}', ${params.product_id})`;
    db.query(string, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    })
  },

  addAnswers: (params, callback) => {
    let arr = [];
    for (var key in params) {
      arr.push(key);
    }
    const string = `INSERT INTO answers (${arr[0]}, ${arr[1]}, ${arr[2]}, ${arr[3]}) VALUES (${params.questions_id}, '${params.body}', '${params.answerer_name}', '${params.answerer_email}')`;
    db.query(string, (err, data) => {
      if (err) {
        console.log(err)
        callback(err, null);
      } else {
        if (params.photos.lenght > 0) {
          let getLargest = `SELECT * FROM answers ORDER BY id DESC LIMIT 1;`
          db.query(getLargest, (err, data) => {
            if (err) {
              console.log(err);
            } else {
              params.photos.map((url) => {
                let addPhotos = `INSERT INTO answers_photos ("answer_id", "url") VALUES (${data.rows[0].id}, '${url}')`
                db.query(addPhotos, (err, data) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log('photos added');
                  }
                })
              })
            }
          })
        };
        callback(null, data);
      }
    });

  },

  markQHelpful: (question_id, callback) => {
    db.query(`select * from questions where id = ${question_id}`, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        db.query(`UPDATE questions SET helpful = ${data.rows[0].helpful + 1} WHERE id = ${questions_id}`, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            callback(null, data);
          }
        })
      }
    })
  },

  markAHelpful: (answer_id, callback) => {
    db.query(`select * from answers where id = ${answer_id}`, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        db.query(`UPDATE answers SET helpful = ${data.rows[0].helpful + 1} WHERE id = ${answer_id}`, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            callback(null, data);
          }
        })
      }
    })
  },

  reportQuestion: (question_id, callback) => {
    db.query(`UPDATE questions SET reported = 1 WHERE id = ${questions_id}`, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    })
  },

  reportAnswer: (answer_id, callback) => {
    db.query(`UPDATE questions SET reported = 1 WHERE id = ${answer_id}`, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    })
  },

}