const foo = require("./foo");
const bar = require("./bar");

// mock
jest.mock("./bar.js", () => {
    // 创建一个funciton
    return jest.fn();
});

test("foo", () => {
    foo();
    expect(bar).toHaveBeenCalled();
});
