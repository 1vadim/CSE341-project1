const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const mongodb = require('./data/database');

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

