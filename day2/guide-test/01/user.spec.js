const User = require("./User");
// 为了程序的可测试性，需组织代码 input output
test("should getName", () => {
    // given
    const user = new User("xiaohong");
    // when
    user.setName("xiaohei");
    //then
    expect(user.getName()).toBe("xiaohei");
});
