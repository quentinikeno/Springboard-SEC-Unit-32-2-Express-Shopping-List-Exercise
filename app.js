const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");
const itemsRoutes = require("./routes/items");

app.use(express.json());
app.use("/items", itemsRoutes);

// 404 Error handler
app.use((req, res, next) => {
	throw new ExpressError("Not Found", 404);
});

// General Error handler
app.use((req, res, next) => {
	res.status(err.status || 500);
	return res.json({ error: err.message });
});

module.exports = app;
