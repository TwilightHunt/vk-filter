const express = require("express");
import router from "../router";
const app = express();

app.use(express.json());
app.use("/", router);

module.exports = app;
