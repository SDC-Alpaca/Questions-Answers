const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  password: 'myPassword',
  database: 'postgres',
})

client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = client;