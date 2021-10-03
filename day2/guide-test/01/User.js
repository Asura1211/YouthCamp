module.exports = class User {
    constructor(name) {
        this.name = name;
    }
    setName(name) {
        this.name = name;
    }
    getName(name) {
        return this.name;
    }
};
