const express = require('express');
const app = express();
const models = require('./models.js');

const port = 3000;

app.use(express.json());



// const url = `/qa/questions?product_id=${product_id}&count=${count}&page=${page}`

app.get('/', (req, res) => {
  res.send('hello');
})

app.get('/qa/questions', (req, res) => {
  models.getQuestions(req.query, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
});

app.post('/qa/questions', (req, res) => {
  models.addQuestions(req.query, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
});

app.post('/qa/questions/:question_id/answers', (req, res) => {
  models.addAnswers(req.query, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
});

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  console.log(req.query)
  models.markQHelpful(req.query, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
});

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  models.markAHelpful(req.query, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
});

app.put('/qa/questions/:question_id/report', (req, res) => {
  models.reportQuestion(req.query, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
})

app.put('/qa/answers/:answer_id/report', (req, res) => {
  models.reportAnswer(req.query, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
})







app.listen(port, () => {
  console.log(`server is listening to ${port}`);
})
