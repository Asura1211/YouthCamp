const add = require("./add");

test("should 1 + 1 = 2", () => {
    // 准备测试数据 -> given
    const a = 1;
    const b = 1;
    // 触发测试动作 -> when
    const r = add(a, b);
    // 验证测试结果 -> then
    expect(r).toBe(2);
    // jest -> 匹配器
});
