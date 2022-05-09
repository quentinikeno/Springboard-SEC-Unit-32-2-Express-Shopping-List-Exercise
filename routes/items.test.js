process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("../app");
let items = require("../fakeDB");

const item = { name: "Lego", price: 10.99 };

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
