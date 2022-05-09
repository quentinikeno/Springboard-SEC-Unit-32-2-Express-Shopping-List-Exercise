const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");
const items = require("./fakeDB");

app.use(express.json());

app.get("/", (req, res) => {
	res.json(items);
});

// 404 Error handler
app.use((req, res, next) => {
	return new ExpressError("Not Found", 404);
});

// General Error handler
app.use((req, res, next) => {
	res.status(err.status || 500);
	return res.json({ error: err.message });
});

module.exports = app;
