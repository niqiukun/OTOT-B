const request = require("supertest");
const app = require("../app");

describe("Test the root path", () => {
  test("It should respond to the GET method", () => {
    return request(app)
      .get("/")
      .expect(200);
  });
});

describe("Test getting empty todo list", () => {
  test("It should return empty todo list", () => {
    return request(app)
      .get("/items")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("There are no items in your todo list!");
      });
  });
});

describe("Test adding item to todo list", () => {
  test("It should respond to the POST method", () => {
    const newItem = {
      name: "Write report"
    };

    return request(app)
      .post("/items")
      .send(newItem)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Item \'" + newItem.name + "\' successfully added!");
      });
  });

  test("It should return todo list with item added", () => {
    return request(app)
      .get("/items")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("These are your todo items: Write report");
      });
  });

  test("It should not add an empty item", () => {
    const emptyItem = {
      name: "     "
    };

    return request(app)
      .post("/items")
      .send(emptyItem)
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("Item name not valid!");
      });
  });
});

describe("Test updating item of todo list", () => {
  test("It should respond to the PUT method", () => {
    const newItem = {
      name: "Prepare for midterms"
    };

    return request(app)
      .put("/items/0")
      .send(newItem)
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Item \'" + newItem.name + "\' successfully updated!");
      });
  });

  test("It should return todo list with item edited", () => {
    return request(app)
      .get("/items")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("These are your todo items: Prepare for midterms");
      });
  });

  test("It should not edit item with invalid id", () => {
    return request(app)
      .put("/items/abc")
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("Item ID not valid!");
      });
  });
});

describe("Test deleting item from todo list", () => {
  test("It should not delete item with invalid id", () => {
    return request(app)
      .delete("/items/10")
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("Item ID not valid!");
      });
  });

  test("It should respond to the DELETE method", () => {
    return request(app)
      .delete("/items/0")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("Item \'Prepare for midterms\' successfully deleted!");
      });
  });

  test("It should return todo list with item deleted", () => {
    return request(app)
      .get("/items")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe("There are no items in your todo list!");
      });
  });
});