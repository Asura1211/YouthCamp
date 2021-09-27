#!/usr/bin/env node
// sheBang windows下不生效

// package.json 中添加 type 为 module，则 js 文件可以使用 esm 规范
import fs from "fs";
import { createIndexTemplate } from "./indexTemplate.js";
import { createPackageJsonTemplate } from "./packageJsonTemplate.js";
import { question } from "./question/index.js";
import { createConfig } from "./config.js";
import execa from "execa";
import path from "path";

// 程序input
const answer = await question();
const config = createConfig(answer);

// 1.创建文件夹（项目名）
fs.mkdirSync(getRootPath());

// 2.创建 index.js, 通过模板渲染 index.js
fs.writeFileSync(getRootPath() + "/index.js", createIndexTemplate(config));

// 3.创建 Package.json
fs.writeFileSync(
  getRootPath() + "/package.json",
  createPackageJsonTemplate(config)
);

// 4.安装依赖
// TODO package -> yarn  路径不对，因此通过 cwd 指定路径(这里失效了)
execa("yarn", {
  cwd: getRootPath(),
  // 标志子进程继承于父进程输出
  // stdio:[2,2,2],
});

function getRootPath() {
  return path.resolve(process.cwd(), config.packageName);
  // return "./haha";
}
