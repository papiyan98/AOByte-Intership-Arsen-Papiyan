
const express = require("express");
const path = require("path");

const data = require('./data.json');

const PORT = process.env.PORT || 3001;

const app = express();

// const pathToFile = path.resolve(__dirname, '../public');
app.use(express.static(path.join(__dirname, '../client/public')));

app.get("/api/data", (req, res) => {
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});