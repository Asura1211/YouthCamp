'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var age = 18;

// tree-shaking

console.log(age);

function main() {
    console.log("main");
}

exports.main = main;
