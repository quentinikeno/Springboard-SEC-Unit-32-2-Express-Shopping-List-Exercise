process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("../app");
let items = require("../fakeDB");

let item = { name: "lego", price: 10.99 };

beforeEach(() => {
	items.push(item);
});

afterEach(() => {
	items.length = 0;
});

describe("GET /items", () => {
	test("should get all items as json", async () => {
		const res = await request(app).get("/items");
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({ items: [item] });
	});
});

describe("POST /items", () => {
	test("should create a new item", async () => {
		const data = { name: "waffles", price: 5.99 };
		const res = await request(app).post("/items").send(data);
		expect(res.statusCode).toBe(201);
		expect(res.body).toEqual({ item: data });
	});
	test("should not create a new item when name or price are missing.", async () => {
		const data = { name: "waffles" };
		const data2 = { price: 5.99 };
		const res = await request(app).post("/items").send(data);
		expect(res.statusCode).toBe(400);
		const res2 = await request(app).post("/items").send(data2);
		expect(res2.statusCode).toBe(400);
	});
});

describe("GET /items/:name", () => {
	test("should get a single item", async () => {
		const res = await request(app).get(`/items/${item.name}`);
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({ item });
	});
	test("should respond with a 404 if item doesn't exist", async () => {
		const res = await request(app).get("/items/oranges");
		expect(res.statusCode).toBe(400);
	});
});

describe("Patch /items/:name", () => {
	test("should update a single item", async () => {
		const data = { name: "mega-blocks", price: 5.99 };
		const res = await request(app).patch(`/items/${item.name}`).send(data);
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({ item: data });
	});
	test("should not update an item when the item is not in the fakeDB", async () => {
		const data = { name: "mega-blocks", price: 5.99 };
		const res = await request(app).patch("/items/ham").send(data);
		expect(res.statusCode).toBe(400);
	});
	test("should not update an item when name or price are not provided", async () => {
		const data = { name: "waffles" };
		const data2 = { price: 5.99 };
		const res = await request(app).patch(`/items/${item.name}`).send(data);
		expect(res.statusCode).toBe(400);
		const res2 = await request(app)
			.patch(`/items/${item.name}`)
			.send(data2);
		expect(res2.statusCode).toBe(400);
	});
});

describe("Delete /items/:name", () => {
	test("should delete a single item", async () => {
		const res = await request(app).delete(`/items/${item.name}`);
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({ message: "Item deleted." });
	});
	test("should not delete an item when the item is not in the fakeDB", async () => {
		const res = await request(app).delete("/items/ham");
		expect(res.statusCode).toBe(400);
	});
});
