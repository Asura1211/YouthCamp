import ejs from "ejs";
import fs from "fs";
import prettier from "prettier";
import { fileURLToPath } from "url";
import path from "path";

export function createPackageJsonTemplate(config) {

  const __dirname = fileURLToPath(import.meta.url);
  const template = fs
    .readFileSync(path.resolve(__dirname, "../template/package.ejs"), "utf-8")
    .toString();

  const code = ejs.render(template, {
    packageName: config.packageName,
    router: config.middleware.router,
    static: config.middleware.static,
  });

  return prettier.format(code, {
    parser: "json",
  });
}
