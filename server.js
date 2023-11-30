const express = require('express');
const config = require("./config");
const app = express();
const port = 30;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(config.port, () => {
  console.log(`[✅] Server running at http://localhost:${port}`);
});
