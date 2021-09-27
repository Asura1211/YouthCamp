import ejs from "ejs";
import fs from "fs";
import prettier from "prettier";
import { fileURLToPath } from "url";
import path from "path";

// 问题驱动
// 1.手动创建需4个步骤，因此用代码解决
// 2.主流程搞定，细化分支：index中的代码用模板来渲染
// 3.模板应该是动态的，因此导入ejs（单一职责，创建模板文件夹）

// 开发思想——小步骤的开发思想
export function createIndexTemplate(config) {
  // esm 下使用 __dirname
  const __dirname = fileURLToPath(import.meta.url);

  const template = fs.readFileSync(path.resolve(__dirname, "../template/index.ejs"), "utf-8").toString();

  const code = ejs.render(template, {
    router: config.middleware.router,
    static: config.middleware.static,
    port: config.port,
  });
  return prettier.format(code, {
    parser: "babel",
  });
}
