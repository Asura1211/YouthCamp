// 解析 the-answer 测试库
import nodeResolve from '@rollup/plugin-node-resolve'

// 将 commonjs-> esm
import commonjs from '@rollup/plugin-commonjs'

// esm
export default {
    input: "./index.js",
    output: {
        file: "dist/bundle.js",
        format:"esm"
    },
    plugins: [nodeResolve(),commonjs()],
}