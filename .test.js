const sum = require("./jestTest");

test("It should return a status code of 200", () => {
  expect(sum()).toBe("status 200");
});

