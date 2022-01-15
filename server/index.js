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
  models.postQuestions(req.query, (err, data) => {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  })
});



app.listen(port, () => {
  console.log(`server is listening to ${port}`);
})
