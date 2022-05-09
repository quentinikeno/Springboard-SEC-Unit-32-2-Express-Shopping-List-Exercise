const express = require("express");
const router = new express.Router();
const ExpressError = require("./ExpressError");
const items = require("../fakeDB");

router.get("/", (req, res) => {
	return res.json({ items });
});

module.exports = router;
