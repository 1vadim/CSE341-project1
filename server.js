const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const mongodb = require('./data/database');

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});
app.use('/', require('./routes'));


mongodb
  .initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(
        `Database is listening and node server is running on http://localhost:${port}`,
      );
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err);
  });

