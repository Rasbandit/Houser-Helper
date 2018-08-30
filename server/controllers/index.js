require('dotenv').config();

const express = require('express');
const BodyParser = require('body-parser');
const massive = require('massive');

const port = 5000;

const app = express();

app.use(bodyParser.json());

massive(process.env.CONNECTION_STRING).then(db => {
  app.set('db', db);
  app.listen(port, () => {
    console.log(`Ship docked at port: port`);
  });
});
