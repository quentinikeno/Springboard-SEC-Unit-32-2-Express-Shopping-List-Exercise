const express = require("express");
const router = new express.Router();
const ExpressError = require("../ExpressError");
const items = require("../fakeDB");

router.get("/", (req, res) => {
	return res.json({ items });
});

router.post("/", (req, res, next) => {
	try {
		const { name, price } = req.body;
		if (!name) throw new ExpressError("Name is required", 400);
		if (!price) throw new ExpressError("Price is required", 400);
		const newItem = { name, price };
		items.push(newItem);
		return res.status(201).json({ item: newItem });
	} catch (error) {
		next(error);
	}
});

router.get("/:name", (req, res, next) => {
	try {
		const foundItem = items.find((item) => item.name === req.body.name);
		if (foundItem) {
			return res.json({ item: foundItem });
		} else {
			throw new ExpressError("Item not found.", 400);
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;