
const express = require("express");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require('dotenv').config();

const db = require("./db");
const authRoutes = require("./routes/auth");
const dataRoutes = require("./routes/data");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use(express.urlencoded({ extended: true }));

// const pathToFile = path.resolve(__dirname, '../public');
app.use(express.static(path.join(__dirname, '../client/public')));

app.use('/api/auth', authRoutes);

app.use("/api/data", dataRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});