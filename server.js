require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const routes = require('./network/routes');

const port = process.env.CONTACTS_DB_PORT || 3000;
const irb = `mongodb+srv://${process.env.CONTACTS_DB_USER}:${process.env.CONTACTS_DB_PASSWORD}@cluster0.pbyrj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

db(irb, process.env.CONTACTS_DB_NAME);

const app = express();
app.use(bodyParser.json());

routes(app);

app.listen(port, () => {
  console.log(`Example app listening at http://${process.env.HOST || 'localhost'}:${port}`);
});
