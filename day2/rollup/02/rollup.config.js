import json from "@rollup/plugin-json";
import {terser} from 'rollup-plugin-terser'
// esm

export default {
    input: "./index.js",
    output: [
        {
            file: "dist/bundle.esm.js",
            format: "esm",
            plugins: [terser()],
        },
        {
            file: "dist/bundle.cjs.js",
            format: "cjs",
        },
    ],
    // 使用plugins
    plugins: [json()],
};
