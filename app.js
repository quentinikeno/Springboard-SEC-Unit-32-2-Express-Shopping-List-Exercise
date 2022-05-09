const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");
const items = require("./fakeDB");

app.use(express.json());

app.use("/", (req, res) => {
	res.json(items);
});

module.exports = app;
