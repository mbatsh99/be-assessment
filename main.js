const express = require("express");
const bodyParser = require("body-parser");

require("./config/database").connect();
require("dotenv").config();

const app = express();

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "../public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(userRoutes);
app.use(authRoutes);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
